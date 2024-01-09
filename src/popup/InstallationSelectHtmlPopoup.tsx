import { HtmlPopup } from './HtmlPopup'
import { type Application } from 'pixi.js'
import { type Game } from '../Game'
import { InstallationSelectPopupApp } from './app/InstallationSelectPopupApp'
import { type Installation } from '../state/slices/types'
import { type JSXInternal } from 'preact/src/jsx'
import { configSlice } from '../state/slices/config.slice'

export class InstallationSelectHtmlPopoup extends HtmlPopup {
    private readonly installations: Installation[]

    constructor (app: Application, game: Game, handleClose: () => void, closebale: boolean, installations: Installation[]) {
        super(app, game, 'Installations', handleClose, true)
        this.installations = installations
        this.closeable = closebale
        this.createApp()
    }

    handleSelect = (id: string) => {
        this.game.store.dispatch(configSlice.actions.updateSelectedInstallation(id))
        this.handleClose()
    }

    handleClear = () => {
        this.game.store.dispatch(configSlice.actions.updateSelectedInstallation(undefined))
        this.handleClose()
    }

    protected getApp (): JSXInternal.Element {
        return <InstallationSelectPopupApp
            closeable={this.closeable}
            onClosePopup={this.handleClose}
            title={this.title}
            installations={this.installations}
            onClear={this.handleClear}
            onSelect={this.handleSelect}
        />
    }
}
