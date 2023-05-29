import { Application, Container, Graphics, TextStyle, Text } from "pixi.js";
import { Game } from '../Game';

export class GeneratorPopup extends Container{
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private readonly popupHeight: number;
    private readonly popupWidth: number;
    private app: Application;
    private game: Game;
    private handleClose;

    constructor(app: Application, game: Game, installationName: string, handleClose: () => void) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;
        this.handleClose = handleClose;
        this.popupWidth = this.screenWidth - 100;
        this.popupHeight = this.screenHeight - 100;
        this.x = (this.screenWidth - this.popupWidth) / 2;
        this.y = (this.screenHeight - this.popupHeight) / 2;
        this.drawFrame();
        this.drawTitle();
    }

    drawTitle() {
        const title = new Text('Generators', new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 20,
            lineHeight: 22
        }));

        title.x = 5;
        title.y = 5;

        const close = new Text('X', new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 20,
            lineHeight: 22
        }));

        close.x = this.popupWidth - 20;
        close.y = 5;
        close.eventMode = 'dynamic';
        close.on('mouseover', (e) => {
            close.style.fill = 0xff0000;
        });
        close.on('mouseout', (e) => {
            close.style.fill = 0xffffff;
        });
        close.cursor = 'pointer';
        close.on('pointertap', this.handleClose)


        this.addChild(title);
        this.addChild(close);
    }

    drawFrame() {
        const graphy: Graphics = new Graphics();
        graphy.beginFill(0x000000, 1);
        graphy.lineStyle(2, 0xffffff);
        graphy.drawRect(0, 0, this.popupWidth, this.popupHeight);
        graphy.endFill();

        this.addChild(graphy);
    }
}