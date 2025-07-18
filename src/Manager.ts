import { Application } from '@pixi/app'
import { DisplayObject } from '@pixi/display'

// eslint-disable-next-line
export class Manager {
    private constructor () { /* this class is purely static. No constructor to see here */ }

    // Safely store variables for our game
    private static app: Application
    private static currentScene: IScene

    // Width and Height are read-only after creation (for now)
    private static readonly _width: number
    private static readonly _height: number

    // With getters but not setters, these variables become read-only
    public static get width (): number {
        return Manager._width
    }

    public static get height (): number {
        return Manager._height
    }

    // Use this function ONCE to start the entire machinery
    public static initialize (app: Application): void {
        Manager.app = app
        // Add the ticker
        // eslint-disable-next-line
        Manager.app.ticker.add(Manager.update)
    }

    // Call this function when you want to go to a new scene
    public static changeScene (newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene)
            Manager.currentScene.destroy()
        }

        // Add the new one
        Manager.currentScene = newScene
        Manager.app.stage.addChild(Manager.currentScene)
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update (framesPassed: number): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed)
        }

    // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
    }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
    update: (framesPassed: number) => void
}
