export class PositionIncrementer {
    private startValue: number;
    private step: number;
    private index: number = 0;

    constructor(startValue: number, step: number) {
        this.startValue = startValue;
        this.step = step;
    }

    public getNext(): number {
        return this.startValue + this.step * this.index++;
    }

    static getInstance(startValue: number, step: number) {
        return new PositionIncrementer(startValue, step);
    }
}