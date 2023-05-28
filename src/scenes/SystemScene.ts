import { Application, Container, Sprite, TextStyle, Text, Graphics } from "pixi.js";
import RandSeed from 'rand-seed';
import { IScene, Manager } from '../Manager';
import { Game } from '../Game';
import { ObjectScene } from './ObjectScene';
import { generateSolarSystem } from "../utils/starSystem";
import { SolarSystem, SpaceObject } from "../utils/starSystem.types";


export class SystemScene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    private app: Application;
    private game: Game;
    private seed: string = '';
    private currentSeed: string = '';

    constructor(app: Application, game: Game) {
        super();
        this.screenWidth = app.screen.width;
        this.screenHeight = app.screen.height;
        this.game = game;
        this.app = app;

        this.currentSeed = this.seed = String(Date.now());
        const system = generateSolarSystem(new RandSeed(this.seed));

        this.drawFrame();
        this.drawSystem(system);
        this.drawResetButton();
    }

    drawResetButton () {
        const reset = new Text('reset', {
            fontFamily: 'Pixel',
            fontSize: '18px',
            fill: 0xffffff,
            lineHeight: 24,
        });
        reset.anchor.set(1);
        reset.x = this.screenWidth - 30;
        reset.y = this.screenHeight - 30;
        reset.eventMode = 'dynamic';
        reset.cursor = 'pointer';
        reset.on('pointertap', () => {
            this.seed = String(Date.now());
        });
        reset.on('mouseover', (e) => {
            reset.style.fill = 0xff0000;
        });
        reset.on('mouseout', (e) => {
            reset.style.fill = 0xffffff;
        });

        this.addChild(reset);
    }

    degreesToRadians(degrees: number)
    {
        var pi = Math.PI;
        return degrees * (pi/180);
    }

    getPosOnEcllipse(height: number, width: number, angle: number) : {x: number, y: number} {
        const radians = this.degreesToRadians(angle);

        const x = this.screenWidth / 2 + ((height) * Math.cos(radians));
        const y = this.screenHeight / 2 + ((width) * Math.sin(radians));

        return {
            x,
            y,
        }
    }

    drawSystem (system: SolarSystem) {
        const sun = Sprite.from(`sun/${system.star.type}.png`);
        sun.anchor.set(0.5);
        sun.x = this.screenWidth / 2;
        sun.y = this.screenHeight / 2;
        sun.width = 96;
        sun.height = 96;
        sun.angle = system.star.angle || 0;

        this.addChild(sun);

        const divider = system.objectsCount <= 2 ? 4 : 2;
        const yAdd = ((this.screenHeight / divider) - 60) / system.objectsCount;
        const xAdd = ((this.screenWidth / divider) - 60) / system.objectsCount;

        for(let i = 1; i <= system.objectsCount; i++ ) {
            this.drawPlanet(xAdd*i, yAdd*i, system.objects[i-1]);
        }
    }

    drawPlanet(xAdd: number, yAdd: number, planet: SpaceObject) {
        const graphy: Graphics = new Graphics();
        graphy.beginFill(0x000000, 0);
        graphy.lineStyle(2, 0xffffff);
        graphy.drawEllipse(this.screenWidth / 2, this.screenHeight / 2, xAdd, yAdd);
        graphy.endFill();


        this.addChild(graphy);

        const {x,y} = this.getPosOnEcllipse(xAdd, yAdd, planet.startAngle);

        const planetSprite = Sprite.from(`${planet.sprite}.png`);
        planetSprite.anchor.set(0.5);
        planetSprite.x = x;
        planetSprite.y = y;
        planetSprite.angle = planet.ratationAngle;
        planetSprite.width = planet.mass <= 4 ? 32 : 48;
        planetSprite.height = planet.mass <= 4 ? 32 : 48;

        this.addChild(planetSprite);
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
        if (this.currentSeed !== this.seed) {
            this.children.forEach(child => {
                child.destroy(true);
            });
            this.removeChildren();
            const system = generateSolarSystem(new RandSeed(this.seed));
            this.drawFrame();
            this.drawSystem(system);
            this.drawResetButton();
            this.currentSeed = this.seed;
        }
        framesPassed;
    }
}