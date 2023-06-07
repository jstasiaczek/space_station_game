import { Application } from "pixi.js";
import { Game } from '../Game';
import { Popup } from './Popup';

export class GeneratorPopup extends Popup{
    constructor(app: Application, game: Game, handleClose: () => void) {
        super(app, game, 'Generators', handleClose, true);
        this.drawFrame();
        this.drawTitle(this.title);
    }
}