import { type Application, Container } from 'pixi.js'
import { type AnyAction } from 'redux'
import { type Game } from '../Game'

export abstract class SceneAbstract extends Container {
    protected readonly screenWidth: number
    protected readonly screenHeight: number
    protected app: Application
    protected game: Game

    constructor (app: Application, game: Game) {
        super()
        this.screenWidth = app.screen.width
        this.screenHeight = app.screen.height
        this.game = game
        this.app = app
    }

    dispatchAction (action: AnyAction) {
        this.game.store.dispatch(action)
    }
}
