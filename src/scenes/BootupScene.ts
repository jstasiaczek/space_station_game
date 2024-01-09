import { type Application, Text, Graphics } from 'pixi.js'
import { type IScene, Manager } from '../Manager'
import { type Game } from '../Game'
import { ObjectScene } from './ObjectScene'
import { configSlice } from '@rApp/state/slices/config.slice'
import { galaxySlice } from '@rApp/state/slices/galaxy.slice'
import { generateGalaxy } from '@rApp/utils/starSystem'
import RandSeed from 'rand-seed'
import { type GalaxyStar, type SpaceObject } from '@rApp/utils/starSystem.types'
import { installationSlice } from '@rApp/state/slices/installation.slice'
import { INSTALLATION_TYPE } from '@rApp/state/slices/types'
import { initInstallationResources } from '@rApp/state/slices/typesUtils'
import { getGalaxy } from '@rApp/state/selector'
import { getHydrogenGeneratorByLvl, getSolarGeneratorByLvl } from '@rApp/state/slices/generatorsDesc'
import { SceneAbstract } from './SceneAbscract'

const textLines: Record<number, string> = {
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
    50: '!CONTINUE!'
}

export class BootupScene extends SceneAbstract implements IScene {
    private readonly startTime: number
    private timeDelta: number
    private timeDeltaPassed: number
    private readonly text: Text
    private startLoc: GalaxyStar | undefined
    private startPlanet: SpaceObject | undefined

    constructor (app: Application, game: Game) {
        super(app, game)
        this.startTime = Math.floor(Date.now() / 500)
        this.timeDelta = 0
        this.timeDeltaPassed = 0

        this.drawFrame()
        this.generateData()

        const text = new Text('booting', {
            fontFamily: 'Pixel',
            fontSize: '18px',
            fill: 0xffffff,
            lineHeight: 24
        })
        text.x = 30
        text.y = 30
        this.text = text

        this.addChild(text)
        this.drawSkipButton()
    }

    generateData () {
        // const seed = String(Date.now());
        // for testing
        const seed = '12345'
        this.dispatchAction(galaxySlice.actions.replace(generateGalaxy(new RandSeed(seed))))

        getGalaxy(this.game.store).stars.forEach(galaxyStar => {
            galaxyStar.system.objects.forEach(object => {
                if (!object.isStart) {
                    return
                }
                this.startLoc = galaxyStar
                this.startPlanet = object
            })
        })

        this.dispatchAction(configSlice.actions.update({
            seed,
            currentScreen: 'station',
            selectedLocation: this.startLoc?.system.star.name,
            selectedObject: this.startPlanet?.name
        }))

        this.dispatchAction(installationSlice.actions.installationAdd({
            type: INSTALLATION_TYPE.STATION,
            id: `${this.startPlanet?.name}-${INSTALLATION_TYPE.STATION.slice(0, 3)}01`,
            resources: initInstallationResources(),
            location: this.startPlanet?.name ?? '',
            generators: [
                getSolarGeneratorByLvl(1),
                getHydrogenGeneratorByLvl(1)
            ]
        }))
    }

    startGame () {
        Manager.changeScene(new ObjectScene(this.app, this.game))
    }

    drawSkipButton () {
        const skip = new Text('skip>>>', {
            fontFamily: 'Pixel',
            fontSize: '18px',
            fill: 0xffffff,
            lineHeight: 24
        })
        skip.anchor.set(1)
        skip.x = this.screenWidth - 30
        skip.y = this.screenHeight - 30
        skip.eventMode = 'dynamic'
        skip.cursor = 'pointer'
        skip.on('pointertap', () => {
            this.startGame()
        })
        skip.on('pointerover', (e) => {
            skip.style.fill = 0xff0000
        })
        skip.on('pointerout', (e) => {
            skip.style.fill = 0xffffff
        })

        this.addChild(skip)
    }

    animateText () {
        if (this.timeDelta <= this.timeDeltaPassed) {
            return
        }
        const line = textLines[this.timeDelta]
        if (line === '!CLEAR!') {
            this.text.text = ''
        } else
            if (line === '!CONTINUE!') {
                this.startGame()
            } else if (line) {
                this.text.text = `${this.text.text}${line}`
            }
        this.timeDeltaPassed = this.timeDelta
    }

    drawFrame () {
        const graphy: Graphics = new Graphics()
        graphy.beginFill(0x000000, 0.7)
        graphy.lineStyle(2, 0xffffff)
        graphy.drawRect(10, 10, this.screenWidth - 20, this.screenHeight - 20)
        graphy.lineStyle(0.5, 0xffffff)
        graphy.drawRect(15, 15, 1, 50)
        graphy.drawRect(15, 15, 50, 1)
        graphy.endFill()

        this.addChild(graphy)
    }

    update (framesPassed: number): void {
        this.timeDelta = Math.floor(Date.now() / 500) - this.startTime
        this.animateText()
    }
}
