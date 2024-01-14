import { Application, Container, Graphics, TextStyle, Text } from 'pixi.js'
import { Game } from '../Game'

export class Popup extends Container {
    protected readonly screenWidth: number
    protected readonly screenHeight: number
    protected popupHeight: number
    protected popupWidth: number
    protected app: Application
    protected game: Game
    protected handleClose: () => void
    protected title: string
    protected closeable: boolean

    constructor (app: Application, game: Game, title: string, handleClose: () => void, closeable: boolean = true) {
        super()
        this.screenWidth = app.screen.width
        this.screenHeight = app.screen.height
        this.game = game
        this.app = app
        this.title = title
        this.closeable = closeable
        this.handleClose = handleClose
        this.popupWidth = this.screenWidth - 100
        this.popupHeight = this.screenHeight - 100
        this.x = (this.screenWidth - this.popupWidth) / 2
        this.y = (this.screenHeight - this.popupHeight) / 2
    }

    drawTitle (titleText: string): void {
        const title = new Text(titleText, new TextStyle({
            fontFamily: 'PixelMono',
            fill: 0xffffff,
            fontSize: 20,
            lineHeight: 22
        }))

        title.x = 5
        title.y = 5

        this.addChild(title)
        this.closeable && this.drawCloseButton()
    }

    drawCloseButton (): void {
        const close = new Text('X', new TextStyle({
            fontFamily: 'PixelMono',
            fill: 0xffffff,
            fontSize: 20,
            lineHeight: 22
        }))

        close.x = this.popupWidth - 20
        close.y = 5
        close.eventMode = 'dynamic'
        close.on('pointerover', (e) => {
            close.style.fill = 0xff0000
        })
        close.on('pointerout', (e) => {
            close.style.fill = 0xffffff
        })
        close.cursor = 'pointer'
        close.on('pointertap', this.handleClose)

        this.addChild(close)
    }

    drawFrame (): void {
        const graphy: Graphics = new Graphics()
        graphy.beginFill(0x000000, 0.7)
        graphy.lineStyle(2, 0xffffff)
        graphy.drawRect(0, 0, this.popupWidth, this.popupHeight)
        graphy.endFill()

        this.addChild(graphy)
    }
}
