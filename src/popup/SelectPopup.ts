import { Application, TextStyle } from "pixi.js";
import { Game } from '../Game';
import { Popup } from './Popup';
import { Installation } from "@rApp/state/slices/types";
import { PositionIncrementer } from "@rApp/utils/positionIncrementer";
import { Button } from "@rApp/ui/Button";
import { configSlice } from '../state/slices/config.slice';

export class SelectPopup extends Popup {
    private installations: Installation[];
    private buttons: {[key: string]: Button} = {};

    constructor(app: Application, game: Game, handleClose: () => void, closeable: boolean, installations: Installation[]) {
        super(app, game, 'Installations', handleClose, closeable);
        this.popupWidth = 400;
        this.popupHeight = 400;
        this.x = this.screenWidth / 2 - this.popupWidth / 2;
        this.y = this.screenHeight / 2 - this.popupHeight / 2;
        this.installations = installations;

        this.drawFrame();
        this.drawTitle(this.title);
        this.drawInstallations();
    }

    getButtonStyles() {
        return new TextStyle({
            fontFamily: "PixelMono",
            fill: 0xffffff,
            fontSize: 16,
            lineHeight: 16,
        });
    }

    handleSelect(id: string) {
        this.game.store.dispatch(configSlice.actions.updateSelectedInstallation(id));
        this.handleClose();
    }
    
    handleClear() {
        this.game.store.dispatch(configSlice.actions.updateSelectedInstallation(undefined));
        this.handleClose();
    }

    drawInstallations() {
        const inc = PositionIncrementer.getInstance(60, 40);
        this.installations.forEach((installation => {
            const button = new Button(360, 30, installation.id, this.getButtonStyles());
            button.name = installation.id;
            button.x = this.popupWidth - 380;
            button.eventMode = 'dynamic';
            button.y = inc.getNext();
            button.on('pointertap', () => this.handleSelect(installation.id));
            this.buttons[installation.id] = button;
            this.addChild(this.buttons[installation.id]);
        }));

        if (!this.closeable) {
            return;
        }
        const buttonClear = new Button(360, 30, 'DEBUG: clear', this.getButtonStyles());
        buttonClear.x = this.popupWidth - 380;
        buttonClear.eventMode = 'dynamic';
        buttonClear.y = inc.getNext();
        buttonClear.on('pointertap', () => this.handleClear());
        this.addChild(buttonClear);

        const buttonBack = new Button(360, 30, 'back', this.getButtonStyles());
        buttonBack.x = this.popupWidth - 380;
        buttonBack.eventMode = 'dynamic';
        buttonBack.y = inc.getNext();
        buttonBack.on('pointertap', () => this.handleClose());
        this.addChild(buttonBack);
    }
}