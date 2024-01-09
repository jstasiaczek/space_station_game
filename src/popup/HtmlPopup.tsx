import { type Game } from '../Game'
import { render } from 'preact'
import { mustGetElementById } from '../utils/mustGetElementById'
import { POPUP_CONTAINER_ID } from '../const'
import './htmlPopup.scss'
import { type Application, Container, type IDestroyOptions } from 'pixi.js'
import { type JSXInternal } from 'preact/src/jsx'

export interface IHtmlPopupAppProps {
    onClosePopup: () => void
    title: string
    closeable: boolean
}

export abstract class HtmlPopup extends Container {
    protected app: Application
    protected game: Game
    protected handleClose: () => void
    protected title: string
    protected closeable: boolean
    protected container: HTMLDivElement
    protected root: HTMLDivElement

    constructor (app: Application, game: Game, title: string, handleClose: () => void, closeable: boolean = true) {
        super()
        this.game = game
        this.app = app
        this.title = title
        this.closeable = closeable
        this.handleClose = handleClose
        this.container = mustGetElementById(POPUP_CONTAINER_ID)
        this.root = document.createElement('div')
    }

    protected abstract getApp (): JSXInternal.Element

    protected createApp () {
        this.root.id = String((new Date()).getTime())
        this.root.className = 'popup_container'
        this.container.appendChild(this.root)
        const App = this.getApp()

        render(App, this.root)
    }

    override destroy (options?: boolean | IDestroyOptions | undefined): void {
        render(null, this.root)
        this.root.remove()
        super.destroy()
    }
}
