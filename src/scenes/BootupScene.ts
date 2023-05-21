import { Application, Container, Sprite, TextStyle, Text, Graphics } from "pixi.js";
import { IScene, Manager } from '../Manager';
import { Game } from '../Game';
import { StationScene } from './StationScene';
import { configSlice } from "@rApp/state/slices/config.slice";
import { galaxySlice } from "@rApp/state/slices/galaxy.slice";
import { generateGalaxy } from "@rApp/utils/starSystem";
import RandSeed from 'rand-seed';
import { GalaxyStar, SpaceObject } from "@rApp/utils/starSystem.types";
import { installationSlice } from "@rApp/state/slices/installation.slice";
import { GENERATOR_INCOME_TYPE, GENERATOR_TYPE, INSTALLATION_TYPE, RESOURCES } from "@rApp/state/slices/types";
import { initInstallationResources } from "@rApp/state/slices/typesUtils";
import { MenuScene } from "./MenuScene";

const textLines: {[key: number]: string} = {
    1: ' .',
    2: '.',
    3: '.',
    5: '\nchecking operational memory',
    6: ' .',
    7: '.',
    8: '.',
    9: '\nloading boot image',
    10: ' .',
    11: '.',
    12: '.',
    13: '\nchecking memory banks',
    14: '.',
    15: ' ERROR: no memory bank found!',
    18: '\n\nERROR: can\'t boot, switching into recovery mode.',
    19: '\npreparing recovery image',
    20: ' .',
    21: '.',
    22: '.',
    23: '\nrebotting',
    26: '!CLEAR!',
    29: 'booting recovery mode',
    30: ' .',
    31: '.',
    32: '.',
    33: '\nloading boot image',
    34: ' .',
    35: '.',
    36: '.',
    37: '\nsetting up temporary memory bank',
    38: ' .',
    40: '.',
    41: '.',
    42: '\nloading',
    43: ' .',
    44: '.',
    45: '.',
    46: '\nconnecting to look-out drone',
    47: ' .',
    48: '.',
    49: '.',
    50: '!CONTINUE!',
}

export class BootupScene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private app: Application;
    private game: Game;
    private startTime: number;
    private timeDelta: number;
    private timeDeltaPassed: number;
    private text: Text;
    private startLoc : GalaxyStar;
    private startPlanet: SpaceObject | undefined;

    constructor(app: Application, game: Game) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;
        this.startTime = Math.floor(Date.now() / 500);
        this.timeDelta = 0;
        this.timeDeltaPassed = 0;

        this.drawFrame();

        const seed = '12345';
        this.game.store.dispatch(configSlice.actions.updateSeed(seed));
        this.game.store.dispatch(galaxySlice.actions.replace(generateGalaxy(new RandSeed(seed))));
        // get start location
        // TODO: find some better way
        this.startLoc = this.game.store.getState().galaxy.stars[0];
        const startPlanet = this.startLoc.system.objects.find(object => object.isStart === true);

        this.startPlanet = startPlanet;
        this.game.store.dispatch(installationSlice.actions.installationAdd({
            generators: [
                {
                    income: 0.1,
                    incomeType: RESOURCES.HYDROGEN,
                    type: GENERATOR_TYPE.SOLAR_PANELS,
                    level: 1,
                }
            ],
            type: INSTALLATION_TYPE.STATION,
            id: `${startPlanet?.name}-${INSTALLATION_TYPE.STATION.slice(0, 3)}01`,
            resources: initInstallationResources(),
        }));

        const text = new Text('booting', {
            fontFamily: 'Pixel',
            fontSize: '18px',
            fill: 0xffffff,
            lineHeight: 24,
        })
        text.x = 30;
        text.y = 30;
        this.text = text; 

        this.addChild(text);
        this.drawSkipButton();
    }

    startGame() {
        Manager.changeScene(new StationScene(this.app, this.game, this.startLoc, this.startPlanet));
    }

    drawSkipButton () {
        const skip = new Text('skip>>>', {
            fontFamily: 'Pixel',
            fontSize: '18px',
            fill: 0xffffff,
            lineHeight: 24,
        });
        skip.anchor.set(1);
        skip.x = this.screenWidth - 30;
        skip.y = this.screenHeight - 30;
        skip.eventMode = 'dynamic';
        skip.cursor = 'pointer';
        skip.on('pointertap', () => {
            this.startGame();
        });
        skip.on('mouseover', (e) => {
            skip.style.fill = 0xff0000;
        });
        skip.on('mouseout', (e) => {
            skip.style.fill = 0xffffff;
        });

        this.addChild(skip);
    }

    animateText () {
        if (this.timeDelta <= this.timeDeltaPassed) {
            return;
        }
        const line = textLines[this.timeDelta];
        if (line === '!CLEAR!') {
            this.text.text = '';
        } else
        if (line === '!CONTINUE!') {
            this.startGame();
        } else if (line) {
            this.text.text = `${this.text.text}${line}`;
        }
        this.timeDeltaPassed = this.timeDelta;
    }

    drawFrame () {
        const graphy: Graphics = new Graphics();
        graphy.beginFill(0x000000, 0.7);
        graphy.lineStyle(2, 0xffffff);
        graphy.drawRect(10, 10, this.screenWidth - 20, this.screenHeight - 20);
        graphy.lineStyle(0.5, 0xffffff);
        graphy.drawRect(15, 15, 1, 50);
        graphy.drawRect(15, 15, 50, 1);
        graphy.endFill();

        this.addChild(graphy);
    }

    update(framesPassed: number): void {
        this.timeDelta = Math.floor(Date.now() / 500) - this.startTime;
        this.animateText();
        framesPassed;
    }
}