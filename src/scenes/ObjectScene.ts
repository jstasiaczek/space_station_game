import { Application, Container, Sprite, TextStyle, Text, FederatedPointerEvent } from "pixi.js";
import { IScene } from '../Manager';
import { Game } from '../Game';
import { GalaxyStar, SpaceObject } from "@rApp/utils/starSystem.types";
import { TimeUpdater } from '@rApp/utils/timeUpdater';
import { RESOURCES } from "@rApp/state/slices/types";
import { getConfig, getGalaxy } from "@rApp/state/selector";
import { GeneratorPopup } from '../popup/GeneratorPopup';
import { Button } from '../ui/Button';
import { Veil } from '../popup/Veil';

export class ObjectScene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private app: Application;
    private game: Game;
    private statusText: Text;
    private textUpdater: TimeUpdater = new TimeUpdater();
    private location?: GalaxyStar;
    private object?: SpaceObject;
    private canvas: Container;
    private popup?: Container;
    private veil?: Container;

    constructor(app: Application, game: Game) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;
        this.canvas = new Container();
        this.updateLocation();

        this.statusText = this.drawStatus(this.canvas);
        this.drawStation(this.canvas);
        this.addChild(this.canvas);
        this.drawMenu(this.canvas);
    }

    updateLocation() {
        const { selectedLocation, selectedObject } = getConfig(this.game.store);
        this.location = getGalaxy(this.game.store)
            .stars.find(star => star.system.star.name === selectedLocation);
        this.object = this.location?.system.objects.find(object => object.name === selectedObject);
    }

    getLocationName() : string {
        const { selectedObject } = getConfig(this.game.store);
        return selectedObject || 'Unknown';
    }

    drawStatus(canvas: Container) {
        const styles = new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 18
        });
        const text = new Text(`Location  : ${this.getLocationName()}`, styles);
        text.x = 10;
        text.y = 10;

        const text2 = new Text(`Power     :\nMetals    :\nMetalloids:\nHydrogen  :`, styles);
        text2.x = 10;
        text2.y = 30;

        const text3 = new Text(`0\n0\n0\n0`, styles);
        text3.x = 202;
        text3.y = 30; 

        canvas.addChild(text2);
        canvas.addChild(text3);
        canvas.addChild(text);
        return text3;
    }

    getButton(label: string, y: number, onClick?: (e: FederatedPointerEvent) => void) {
        const button = new Button(200, 50, label, new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 18,
        }));
        button.x = this.screenWidth - 220;
        button.eventMode = 'dynamic';
        button.y = y;
        console.log('label', onClick);
        onClick && button.on('pointertap', onClick);
        return button;
    }

    clearPopup() {
        this.popup && this.canvas.removeChild(this.popup);
        this.veil && this.canvas.removeChild(this.veil);
        this.popup?.destroy();
        this.veil?.destroy();
    }

    drawGenerators() {
        this.clearPopup();
        this.popup = new GeneratorPopup(this.app, this.game, '', () => {
            this.clearPopup();
        });
        this.veil = new Veil(this.app);
        this.canvas.addChild(this.veil);
        this.canvas.addChild(this.popup);
    }

    drawMenu(canvas: Container) {
        const buttonGen = this.getButton('Generators', 20, () => {
            console.log('click');
            this.drawGenerators();
        });
        const buttonMod = this.getButton('Modules', 80);
        const buttonSh = this.getButton('Ships', 140);
        const buttonSt = this.getButton('Status', 200);

        canvas.addChild(buttonGen);
        canvas.addChild(buttonMod);
        canvas.addChild(buttonSh);
        canvas.addChild(buttonSt);
    }

    drawStation(canvas: Container) {
        const app = this.app;
        const station: Sprite = Sprite.from("space_station_small.png");

        station.x = 224 * 1.2;
        station.y = this.screenHeight - 246 * 1.5;

        const planet: Sprite = Sprite.from(`${this.object?.sprite}_500.png` || "planet/default_500.png");

        planet.anchor.set(0.5);
        planet.x = 50;
        planet.y = app.screen.height-50;

        canvas.addChild(planet);
        canvas.addChild(station);
    }

    update(): void {
        this.textUpdater.onUpdate((timestamp) => {
            if (!this.object) {
                return;
            }
            const station = this.game.store.getState().installations[`${this.object?.name}-STA01`];

            let text = `${station.resources[RESOURCES.POWER]}\n`;
            text += `${station.resources[RESOURCES.METALS]}\n`;
            text += `${station.resources[RESOURCES.METALLOIDS]}\n`;
            text += `${station.resources[RESOURCES.HYDROGEN]}\n`;
            this.statusText.text = text;
        });
    }
}