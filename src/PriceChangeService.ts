import Cryptocurrency, { Cryptocurrencies, CryptocurrencyMap } from './cryptocurrencies';

export async function fetchPriceChangePercent(crypto: Cryptocurrencies): Promise<number | null> {
    try {
        const cryptocurrency = CryptocurrencyMap.get(crypto);
        if (!cryptocurrency) {
            console.error(`Cryptocurrency ${crypto} not found in the map.`);
            return null;
        }

        const response = await fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=${crypto}USDT`);
        if (!response.ok) {
            throw new Error(`HTTP request failed with status: ${response.status}`);
        }
        const data = await response.json();
        const priceChangePercent = parseFloat(data.priceChangePercent);

        // You can update the cryptocurrency data with the fetched price here if needed
        cryptocurrency.price = priceChangePercent.toString();

        return priceChangePercent;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}