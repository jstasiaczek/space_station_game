import { Application, Container, Sprite, TextStyle, Text, FederatedPointerEvent, Graphics } from "pixi.js";
import { IScene } from '../Manager';
import { Game } from '../Game';
import { GalaxyStar, SpaceObject } from "@rApp/utils/starSystem.types";
import { TimeUpdater } from '@rApp/utils/timeUpdater';
import { PositionIncrementer } from '@rApp/utils/positionIncrementer';
import { RESOURCES } from "@rApp/state/slices/types";
import { getConfig, getGalaxy, getInstallations } from "@rApp/state/selector";
import { GeneratorPopup } from '../popup/GeneratorPopup';
import { SelectPopup } from '../popup/SelectPopup';
import { Button } from '../ui/Button';
import { Veil } from '../popup/Veil';
import { Installation } from "@rApp/state/slices/types";
import { configSlice } from "@rApp/state/slices/config.slice";

export class ObjectScene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private app: Application;
    private game: Game;
    private statusText: Text = new Text();
    private textUpdater: TimeUpdater = new TimeUpdater();
    private location?: GalaxyStar;
    private object?: SpaceObject;
    private canvas: Container;
    private popup?: Container;
    private veil?: Container;
    private selectedInstallation?: string;

    constructor(app: Application, game: Game) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;
        this.canvas = new Container();
        this.updateLocation();
        const installations = this.getInstallationsList();
        if (installations.length > 1) {
            this.drawSelectMenu(installations, false);
        } else if (installations.length === 1) {
            this.selectedInstallation = installations[0].id;
            this.game.store.dispatch(configSlice.actions.updateSelectedInstallation(this.selectedInstallation));
            this.drawStationScreen();
        }
    }

    clearScreen() {
        this.canvas && this.canvas.removeChild(this.canvas);
        this.canvas?.destroy();
        this.canvas = new Container();
        this.addChild(this.canvas);
    }

    drawStationScreen() {
        this.clearScreen();
        this.statusText = this.drawStatus(this.canvas);
        this.drawStation(this.canvas);
        this.drawMenu(this.canvas);
        this.addChild(this.canvas);
    }

    updateLocation() {
        const { selectedLocation, selectedObject } = getConfig(this.game.store);
        this.location = getGalaxy(this.game.store)
            .stars.find(star => star.system.star.name === selectedLocation);
        this.object = this.location?.system.objects.find(object => object.name === selectedObject);
    }

    drawSelectMenu(installations?: Installation[], closeable: boolean = true) {
        if (!installations) {
            installations = this.getInstallationsList();
        }
        this.clearPopup();
        this.popup = new SelectPopup(this.app, this.game, () => {
            this.clearPopup();
        }, closeable, this.getInstallationsList());
        this.veil = new Veil(this.app);
        this.canvas.addChild(this.veil);
        this.canvas.addChild(this.popup);
    }

    getInstallationsList() {
        if (!this.object) {
            return [];
        }
        const installations = getInstallations(this.game.store);
        const keys = Object.keys(installations);
        const result : Installation[] = [];
        keys.forEach(key => {
            if (installations[key].location === this.object?.name) {
                result.push(installations[key]);
            }
        })
        return result;
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
        const button = new Button(220, 50, label, new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 18,
        }));
        button.x = this.screenWidth - 240;
        button.eventMode = 'dynamic';
        button.y = y;
        onClick && button.on('pointertap', onClick);
        return button;
    }

    clearPopup() {
        this.popup && this.canvas.removeChild(this.popup);
        this.veil && this.canvas.removeChild(this.veil);
        this.popup?.destroy();
        this.veil?.destroy();
    }

    drawGeneratorsPopup() {
        this.clearPopup();
        this.popup = new GeneratorPopup(this.app, this.game, () => {
            this.clearPopup();
        });
        this.veil = new Veil(this.app);
        this.canvas.addChild(this.veil);
        this.canvas.addChild(this.popup);
    }

    drawMenu(canvas: Container) {
        const incremeter = PositionIncrementer.getInstance(20, 60);
        const buttonInst = this.getButton('Installations', incremeter.getNext(), () => this.drawSelectMenu());
        const buttonGen = this.getButton('Generators', incremeter.getNext(), () => this.drawGeneratorsPopup());
        const buttonMod = this.getButton('Modules', incremeter.getNext());
        const buttonSh = this.getButton('Ships', incremeter.getNext());
        const buttonSt = this.getButton('Status', incremeter.getNext());

        canvas.addChild(buttonGen);
        canvas.addChild(buttonMod);
        canvas.addChild(buttonSh);
        canvas.addChild(buttonSt);
        canvas.addChild(buttonInst);
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
            if (!this.object || !this.selectedInstallation) {
                return;
            }
            const station = this.game.store.getState().installations[this.selectedInstallation];

            let text = `${station.resources[RESOURCES.POWER]}\n`;
            text += `${station.resources[RESOURCES.METALS]}\n`;
            text += `${station.resources[RESOURCES.METALLOIDS]}\n`;
            text += `${station.resources[RESOURCES.HYDROGEN]}\n`;
            this.statusText.text = text;
        });
        const installation = getConfig(this.game.store).selectedInstallation;
        if (installation != this.selectedInstallation) {
            this.selectedInstallation = installation;
            if (this.selectedInstallation === undefined) {
                this.clearScreen();
                this.drawSelectMenu(undefined, false);
            } else {
                this.clearPopup();
                this.drawStationScreen();
            }
        }
    }
}