/**
 *Handels basic caching of data
 * may in the future be changed to indexedDB
 */
export class LocalStorage {
    item: string = "";
    private intervalId: number | null = null;

    constructor(item: string) {
        this.item = item;
    }

    public setItem(value: any): void {
        const serialized = JSON.stringify(value);
        localStorage.setItem(this.item, serialized);
    }

    public getItem<T = any>(): T | null {
        const stored = localStorage.getItem(this.item);
        return stored ? JSON.parse(stored) as T : null;
    }

    public removeItem(): void {
        localStorage.removeItem(this.item);
    }

    public exists(): boolean {
        return localStorage.getItem(this.item) !== null;
    }

    /**
     * Periodically refresh localStorage value with latest data
     * @param fetchFn async function returning fresh data
     * @param interval time in milliseconds
     */
    public refresh(fetchFn: () => Promise<any>, interval: number = 60000): void {
        this.clearRefresh(); // clear any existing interval

        this.intervalId = window.setInterval(async () => {
            try {
                const data = await fetchFn();
                this.setItem(data);
            } catch (error) {
                console.error("Failed to refresh data for", this.item, error);
            }
        }, interval);
    }

    public clearRefresh(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

