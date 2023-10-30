import Cryptocurrency from "./cryptocurrencies";

export async function fetchPriceChangePercent(): Promise<number | null> {
    try {
        const response = await fetch('https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSDT');
        if (!response.ok) {
            throw new Error(`HTTP request failed with status: ${response.status}`);
        }
        const data = await response.json();
        return parseFloat(data.priceChangePercent);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}