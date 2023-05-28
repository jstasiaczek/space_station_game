import { Application, Container, Graphics } from "pixi.js";
import { Game } from '../Game';

export class GeneratorPopup extends Container{
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private readonly popupHeight: number;
    private readonly popupWidth: number;
    private app: Application;
    private game: Game;

    constructor(app: Application, game: Game, installationName: string) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;
        this.popupWidth = this.screenWidth - 100;
        this.popupHeight = this.screenHeight - 100;
        this.x = (this.screenWidth - this.popupWidth) / 2;
        this.y = (this.screenHeight - this.popupHeight) / 2;
        this.drawFrame();
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