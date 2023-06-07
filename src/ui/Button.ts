import { Container, Graphics, TextStyle, Text } from "pixi.js";

export class Button extends Container {
    private text: string;
    private styles: TextStyle;
    private buttonWidth: number;
    private buttonHeight: number;

    constructor(width: number, height: number, text: string, styles: TextStyle) {
        super();
        this.buttonWidth = width;
        this.width = width;
        this.height = height;
        this.buttonHeight = height;
        this.text = text;
        this.styles = styles; 
        this.drawButton();
    }

    drawButton() {
        const graphy: Graphics = new Graphics();
        graphy.beginFill(0x000000, 0.7);
        graphy.lineStyle(2, 0xffffff);
        graphy.drawRect(0, 0, this.buttonWidth, this.buttonHeight);
        graphy.endFill();

        const text = new Text(this.text, this.styles);
        text.anchor.set(0.5);
        text.x = this.buttonWidth / 2;
        text.y = this.buttonHeight / 2;

        const handleEvent = (textFill: number, buttonBg: number, buttonColor: number) => () => {
            text.style.fill = textFill;
            graphy.beginFill(buttonBg, 0.7);
            graphy.lineStyle(2, buttonColor);
            graphy.drawRect(0, 0, this.buttonWidth, this.buttonHeight);
            graphy.endFill();
        }

        this.eventMode = 'dynamic';
        this.cursor = 'pointer';
        this.on('pointerover', handleEvent(0xff0000, 0x000000, 0xa3a3a3));
        this.on('pointerout', handleEvent(0xffffff, 0x000000, 0xffffff));
        this.on('pointertap', handleEvent(0xffffff, 0x000000, 0xffffff));

        this.addChild(graphy);
        this.addChild(text);
    }
}