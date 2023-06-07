import { Application, Container, Sprite, TextStyle, Text } from "pixi.js";
import { IScene, Manager } from '../Manager';
import { Game } from '../Game';
import { BootupScene } from "./BootupScene";
import { SystemScene } from "./SystemScene";
import { Button } from "@rApp/ui/Button";

export class MenuScene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private app: Application;
    private game: Game;

    constructor(app: Application, game: Game) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;

        this.drawMenu();
    }

    drawMenu() {
        const logo: Sprite = Sprite.from("space_station_logo.png");

        logo.anchor.set(0.5);

        logo.x = this.screenWidth / 2;
        logo.y = 50 +  246 / 2;

        const startGame = new Button(400, 60, "Start New Game", new TextStyle({
            fontFamily: "Pixel",
            fill: 0xffffff,
            fontSize: 20
        }));
        startGame.x = this.screenWidth / 2 - 200;
        startGame.y = 50 + 246 + 50;
        startGame.eventMode = 'dynamic';
        startGame.on('pointertap', (e) => {
            Manager.changeScene(new BootupScene(this.app, this.game));
        });

        const viewSystem = new Button(400, 60, "View System", new TextStyle({
            fontFamily: "Pixel",
            fill: 0xffffff,
            fontSize: 20
        }));
        viewSystem.x = this.screenWidth / 2 - 200;
        viewSystem.y = 50 + 246 + 120;
        viewSystem.eventMode = 'dynamic';
        viewSystem.on('pointertap', (e) => {
            Manager.changeScene(new SystemScene(this.app, this.game));
        });

        
        this.addChild(logo);
        this.addChild(startGame);
        this.addChild(viewSystem);
    }

    update(framesPassed: number): void {
        framesPassed;

    }
}