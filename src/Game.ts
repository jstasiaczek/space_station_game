import { EventEmitter } from "eventemitter3";
import { Application, Assets, Sprite } from "pixi.js";
import { Manager } from "./Manager";
import { MenuScene } from './scenes/MenuScene';
import { StoreData, setupStore } from './state/store/configureStore';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { TimeUpdater } from '@rApp/utils/timeUpdater';
import { installationSlice } from "./state/slices/installation.slice";
export class Game extends EventEmitter {
    private app: Application;
    private static instance: Game;
    public store: ToolkitStore<StoreData>;
    private timeUpdater = new TimeUpdater();

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private constructor() {
        super();

        this.app = this.setupApp();
        this.store = setupStore();

        this.app.ticker.add(this.mainTicker, this);
        Manager.initialize(this.app);
        Manager.changeScene(new MenuScene(this.app, this));
    }

    mainTicker (framesPassed: number): void {
        this.timeUpdater.onUpdate((timestamp) => {
            Object.values(this.store.getState().installations)
            .forEach(installation => {
                installation.generators.forEach(generator => {
                    this.store.dispatch(installationSlice.actions.updateResource({
                        installationId: installation.id,
                        resource: generator.incomeType,
                        value: generator.income,
                    }));
                });
            });
        });
    }

    drawBackground() {
        const planet: Sprite = Sprite.from("background.png");

        planet.anchor.set(0.5);
        planet.x = this.app.screen.height / 2;
        planet.y = this.app.screen.width / 2;

        this.app.stage.addChild(planet);
    }

    setupApp () : Application {
        return new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x000000,
            backgroundAlpha: 1,
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        });
    }
}