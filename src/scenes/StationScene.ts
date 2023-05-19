import { Application, Container, Sprite, TextStyle, Text } from "pixi.js";
import { IScene } from '../Manager';
import { Game } from '../Game';

export class StationScene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private app: Application;
    private game: Game;
    private statusText: Text;

    constructor(app: Application, game: Game) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;

        this.statusText = this.drawStatus();
        this.drawStation();
    }

    drawStatus() {
        const text = new Text("Location: Unknown", new TextStyle({
            fontFamily: "Pixel",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 18
        }));
        text.x = 10;
        text.y = 10;

        this.addChild(text);
        return text;
        
    }

    drawStation() {
        const app = this.app;
        const station: Sprite = Sprite.from("space_station_small.png");

        station.x = 224 * 1.2;
        station.y = app.screen.height - 246 * 1.5;
        station.angle = 280 

        const planet: Sprite = Sprite.from("planet_toxic.png");

        planet.anchor.set(0.5);
        planet.x = 0+300/2;
        planet.y = app.screen.height-300/2;

        this.addChild(planet);
        this.addChild(station);
    }

    update(framesPassed: number): void {
    }
}