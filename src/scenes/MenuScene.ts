import { Application, Container, Sprite, TextStyle, Text } from "pixi.js";
import { IScene, Manager } from '../Manager';
import { Game } from '../Game';
import { BootupScene } from "./BootupScene";
import { SystemScene } from "./SystemScene";

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

        const startGame = new Text("Start New Game", new TextStyle({
            fontFamily: "Pixel",
            fill: 0xffffff,
            fontSize: 18
        }));
        startGame.x = this.screenWidth / 2;
        startGame.y = 50 + 246 + 50;
        startGame.anchor.set(0.5);
        startGame.eventMode = 'dynamic';
        startGame.cursor = 'pointer';
        startGame.on('mouseover', (e) => {
            startGame.style.fill = 0xff0000;
        });
        startGame.on('mouseout', (e) => {
            startGame.style.fill = 0xffffff;
        });
        startGame.on('pointertap', (e) => {
            Manager.changeScene(new BootupScene(this.app, this.game));
        });

        const viewSystem = new Text("View System", new TextStyle({
            fontFamily: "Pixel",
            fill: 0xffffff,
            fontSize: 18
        }));
        viewSystem.x = this.screenWidth / 2;
        viewSystem.y = 50 + 246 + 100;
        viewSystem.anchor.set(0.5);
        viewSystem.eventMode = 'dynamic';
        viewSystem.cursor = 'pointer';
        viewSystem.on('mouseover', (e) => {
            viewSystem.style.fill = 0xff0000;
        });
        viewSystem.on('mouseout', (e) => {
            viewSystem.style.fill = 0xffffff;
        });
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