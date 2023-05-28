import { Application, Container, Graphics } from "pixi.js";

export class Veil extends Container {
    protected screenWidth: number;
    protected screenHeight: number;

    constructor(app: Application) {
        super();
        this.screenHeight = app.screen.height;
        this.screenWidth = app.screen.width;
        this.drawVeil();
    }

    drawVeil() {
        const graphy: Graphics = new Graphics();
        graphy.beginFill(0x000000, 0.7);
        graphy.lineStyle(2, 0x000000);
        graphy.drawRect(0, 0, this.screenWidth, this.screenHeight);
        graphy.endFill();
        this.eventMode ='passive';

        this.addChild(graphy);
    }
}