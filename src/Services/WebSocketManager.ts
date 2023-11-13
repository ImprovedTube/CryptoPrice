import Cryptocurrency from "../Utils/cryptocurrencies";

class WebSocketManager {
    ws: WebSocket | null = null;
    private lastPrice = new Map<string, string>();
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

export default WebSocketManager;
