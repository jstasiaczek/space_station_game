import { HtmlPopup } from './HtmlPopup'
import { type Application } from 'pixi.js'
import { type Game } from '../Game'
import { GeneratorPopupApp } from './app/GeneratorPopupApp'
import { type JSXInternal } from 'preact/src/jsx'
import { type Generator } from '../state/slices/types'

export class GeneratorHtmlPopup extends HtmlPopup {
    protected generators: Generator[]

    constructor (app: Application, game: Game, handleClose: () => void, generators: Generator[]) {
        super(app, game, 'Generators', handleClose, true)
        this.generators = generators
        this.createApp()
    }

    protected getApp (): JSXInternal.Element {
        return <GeneratorPopupApp
            closeable={this.closeable}
            onClosePopup={this.handleClose}
            title={this.title}
            generators={this.generators}
        />
    }
}
