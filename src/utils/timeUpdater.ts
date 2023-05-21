export class TimeUpdater {
    private timeDelta: number = 0;
    private currentDelta: number = -1;

    private getTimestamp() {
        return Math.floor(Date.now() / 1000);
    }

    public constructor() {
        this.currentDelta = this.getTimestamp();
    }

    public onUpdate(callback: (timestamp: number) => void) {
        if (this.currentDelta !== this.timeDelta) {
            this.timeDelta = this.currentDelta;
            callback(this.currentDelta);
        }
        this.currentDelta = this.getTimestamp();
    }
}