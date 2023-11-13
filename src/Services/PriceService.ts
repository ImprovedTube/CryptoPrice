import Cryptocurrency from "../Utils/cryptocurrencies";

class PriceService {
    ws: WebSocket | null = null;
    private lastPrice = '0.0';

    // Callback functions for when connected or disconnected
    private sendPriceCallback: ((price: string, color: string) => void) | null = null;

    registerSendPriceCallback(callback: (price: string, color: string) => void) {
        this.sendPriceCallback = callback;
    }


    constructor(crypto: Cryptocurrency) {
        this.ws = new WebSocket(crypto.ws_address);

        this.ws.onmessage = (event: any) => {
            const stockPrice = parseFloat(JSON.parse(event.data).p).toFixed(2);
            const color = !this.lastPrice || this.lastPrice === stockPrice ? 'gray.200' : parseFloat(this.lastPrice) > parseFloat(stockPrice) ? 'red' : 'green';

            this.lastPrice = stockPrice;
            this.sendPriceCallback?.(stockPrice, color);
        }
    }
}

class WebSocketManager {
    ws: WebSocket | null = null;
    private lastPrice = new Map<string, string>();
    // sendPriceCallbacks: Map<string, (price: string, color: string) => void> = new Map();

    private sendPriceCallback: ((crypto: string, price: string, color: string) => void) | null = null;

    registerSendPriceCallback(callback: (crypto: string, price: string, color: string) => void) {
        this.sendPriceCallback = callback;
    }
    unregisterSendPriceCallback() {
        this.sendPriceCallback = null;
    }


    constructor(cryptocurrencies: Cryptocurrency[]) {
        this.initializeWebSocket(cryptocurrencies);
    }

    private initializeWebSocket(cryptocurrencies: Cryptocurrency[]) {
        const names = cryptocurrencies.map((crypto) => crypto.name.toLowerCase());
        const resultString = names.join('usdt@trade/');
        const wsAddress = `wss://stream.binance.com:9443/stream?streams=${resultString}usdt@trade`;
    
        this.ws = new WebSocket(wsAddress);
    
        this.ws.onmessage = (event: MessageEvent) => {
            const eventData = JSON.parse(event.data);
            
            const cryptoName = eventData.data.s?.replace('USDT', '')?.toUpperCase();
            

            if (cryptoName) {
                const stockPrice = parseFloat(eventData.data.p).toFixed(2);
                const color = this.calculateColor(cryptoName, stockPrice);

                this.lastPrice.set(cryptoName, stockPrice);

                if (this.sendPriceCallback) {
                    this.sendPriceCallback(cryptoName, stockPrice, color);
                }
            }
        };
    }

    
    private calculateColor(cryptoName: string, stockPrice: string): string {
        const lastPrice = this.lastPrice.get(cryptoName);
        return !lastPrice || lastPrice === stockPrice
            ? 'gray.200'
            : parseFloat(lastPrice) > parseFloat(stockPrice)
            ? 'red'
            : 'green';
    }
    
    updateCryptocurrencies(cryptocurrencies: Cryptocurrency[]) {
        // Close the existing WebSocket connection
        this.ws?.close();
    
        // Initialize the WebSocket with the updated list of cryptocurrencies
        this.initializeWebSocket(cryptocurrencies);
    }
}

export default PriceService;
export { WebSocketManager };