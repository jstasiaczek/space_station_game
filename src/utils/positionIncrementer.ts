export class PositionIncrementer {
    private readonly startValue: number
    private readonly step: number
    private index: number = 0

    constructor (startValue: number, step: number) {
        this.startValue = startValue
        this.step = step
    }

    public getNext (): number {
        return this.startValue + this.step * this.index++
    }

    static getInstance (startValue: number, step: number): PositionIncrementer {
        return new PositionIncrementer(startValue, step)
    }
}
