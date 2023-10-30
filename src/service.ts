import React, { useState } from "react"
import Cryptocurrency from "./cryptocurrencies";

class PriceService {
    ws: WebSocket | null = null;
    private lastPrice = '0.0';
    // private crypto: Cryptocurrency | null = null;

    // Callback functions for when connected or disconnected
    private sendPriceCallback: ((price: string, color: string) => void) | null = null;

    registerSendPriceCallback(callback: (price: string, color: string) => void) {
        this.sendPriceCallback = callback;
    }


    constructor(crypto: Cryptocurrency) {
        this.ws = new WebSocket(crypto.ws_address);

        this.ws.onmessage = (event: any) => {
            const stockPrice = parseFloat(JSON.parse(event.data).p).toFixed(2);
            //setPrice('$' + stockPrice);
            const color = !this.lastPrice || this.lastPrice === stockPrice ? 'gray.200' : parseFloat(this.lastPrice) > parseFloat(stockPrice) ? 'red' : 'green';

            this.lastPrice = stockPrice;
            this.sendPriceCallback?.(stockPrice, color);
        }
    }
}

export default PriceService;