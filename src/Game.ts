import { EventEmitter } from "eventemitter3";
import { Application, Assets, Sprite } from "pixi.js";
import { Manager } from "./Manager";
import { StationScene } from './scenes/StationScene';
import { MenuScene } from './scenes/MenuScene';

export class Game extends EventEmitter {
    private app: Application;
    private static instance: Game;

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private constructor() {
        super();

        this.app = this.setupApp();

        this.registerEvents();

        
        const planet: Sprite = Sprite.from("background.png");

        planet.anchor.set(0.5);

        planet.x = this.app.screen.height / 2;
        planet.y = this.app.screen.width / 2;

        this.app.stage.addChild(planet);


        Manager.initialize(this.app);
        Manager.changeScene(new MenuScene(this.app, this));
    }

    loadAssets() {
    }

    registerEvents() {
        this.on('click', (args) => {
            console.log(args);
        });
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