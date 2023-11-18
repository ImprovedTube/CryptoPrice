import Cryptocurrency from '../Utils/cryptocurrencies';


export async function fetchPriceChangePercent(crypto: Cryptocurrency): Promise<number> {
    try {
        if (!crypto) {
            console.error(`Cryptocurrency ${crypto} not found in the map.`);
            return 0.00;
        }

        const firstApiResponse = await fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=${crypto.name}USDT`);
        if (!firstApiResponse.ok) {
            throw new Error(`HTTP request failed with status: ${firstApiResponse.status}`);
        }

        const firstApiData = await firstApiResponse.json();
        const priceChangePercent = parseFloat(firstApiData.priceChangePercent).toFixed(2);

        // You can update the cryptocurrency data with the fetched price here if needed
        crypto.price = priceChangePercent.toString();

        return parseFloat(priceChangePercent);
    } 
    catch (firstApiError) {
        return 0.00;
    }
}