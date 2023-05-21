import { Application, Container, Sprite, TextStyle, Text } from "pixi.js";
import { IScene } from '../Manager';
import { Game } from '../Game';
import { GalaxyStar, SpaceObject } from "@rApp/utils/starSystem.types";
import { TimeUpdater } from '@rApp/utils/timeUpdater';
import { RESOURCES } from "@rApp/state/slices/types";

export class StationScene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private app: Application;
    private game: Game;
    private statusText: Text;
    private location: GalaxyStar;
    private selectedPlanet: SpaceObject|undefined;
    private textUpdater: TimeUpdater = new TimeUpdater(); 

    constructor(app: Application, game: Game, location: GalaxyStar, planet?: SpaceObject) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;
        this.location = location;
        this.selectedPlanet = planet;

        this.statusText = this.drawStatus();
        this.drawStation();
    }

    getLocation() : string {
        if (this.selectedPlanet) {
            return this.selectedPlanet.name;
        }
        return this.location.system.star.name;
    }

    drawStatus() {

        const text = new Text(`Location  : ${this.getLocation()}`, new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 18
        }));
        text.x = 10;
        text.y = 10;

        const text2 = new Text(`Power     :\nMetals    :\nMetalloids:\nHydrogen  :`, new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 18
        }));
        text2.x = 10;
        text2.y = 30;
        const text3 = new Text(`0\n0\n0\n0`, new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 18
        }));
        text3.x = 200;
        text3.y = 30;

        this.addChild(text2);
        this.addChild(text3);
        this.addChild(text);
        return text3;
        
    }

    drawStation() {
        const app = this.app;
        const station: Sprite = Sprite.from("space_station_small.png");

        station.x = 224 * 1.2;
        station.y = app.screen.height - 246 * 1.5;

        const planet: Sprite = Sprite.from(`${this.selectedPlanet?.sprite}_500.png` || "planet/default_500.png");

        planet.anchor.set(0.5);
        planet.x = 50;
        planet.y = app.screen.height-50;

        this.addChild(planet);
        this.addChild(station);
    }

    update(framesPassed: number): void {
        this.textUpdater.onUpdate((timestamp) => {
            if (!this.selectedPlanet) {
                return;
            }
            const station = this.game.store.getState().installations[`${this.selectedPlanet?.name}-STA01`];
            this.statusText.text = `${station.resources[RESOURCES.POWER]}\n${station.resources[RESOURCES.METALS]}\n${station.resources[RESOURCES.METALLOIDS]}\n${station.resources[RESOURCES.HYDROGEN]}\n`;
        });
    }
}