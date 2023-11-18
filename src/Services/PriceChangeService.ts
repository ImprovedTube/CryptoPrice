import Cryptocurrency from '../Utils/cryptocurrencies';

// export async function fetchPriceChangePercent(crypto: Cryptocurrency): Promise<number | null> {

//     try {
//         if (!crypto) {
//             console.error(`Cryptocurrency ${crypto} not found in the map.`);
//             return 0.00;
//         }

//         const response = await fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=${crypto.name}USDT`);
//         if (!response.ok) {
//             // throw new Error(`HTTP request failed with status: ${response.status}`);
//             const secondResponse = await fetch(`https://production.api.coindesk.com/v2/tb/price/values/${crypto.name.toUpperCase()}?start_date=${getOneHourBeforeCurrentDate()}&end_date=${getCurrentDateTime()}&interval=1h`);
//             if(!secondResponse.ok) {
//                 throw new Error(`HTTP request failed with status: ${response.status}`);
//             }
//         }

//         const data = await response.json();
//         const priceChangePercent = parseFloat(data.priceChangePercent);

//         crypto.price = priceChangePercent.toString();

//         return priceChangePercent;
//     } catch (error) {
//         return 0.00;
//     }
// }

export async function fetchPriceChangePercent(crypto: Cryptocurrency): Promise<number> {
    try {
        if (!crypto) {
            console.error(`Cryptocurrency ${crypto} not found in the map.`);
            return 0.00;
        }

        const firstApiResponse = await fetch(`https://apid.binance.us/api/v3/ticker/24hr?symbol=${crypto.name}USDT`);
        if (!firstApiResponse.ok) {
            throw new Error(`HTTP request failed with status: ${firstApiResponse.status}`);
        }

        const firstApiData = await firstApiResponse.json();
        const priceChangePercent = parseFloat(firstApiData.priceChangePercent).toFixed(2);

        // You can update the cryptocurrency data with the fetched price here if needed
        crypto.price = priceChangePercent.toString();

        return parseFloat(priceChangePercent);
    } catch (firstApiError) {
        // console.error('Error fetching data from the first API:', firstApiError);

        try {
            // Attempt a fallback API request if the first API call fails
            const fallbackApiResponse = await fetch(`https://production.api.coindesk.com/v2/tb/price/values/${crypto.name.toUpperCase()}?start_date=${getOneDayBeforeCurrentDate()}&end_date=${getCurrentDateTime()}&interval=1h`);
            if (!fallbackApiResponse.ok) {
                throw new Error(`HTTP request failed with status: ${fallbackApiResponse.status}`);
            }

            const fallbackApiData = await fallbackApiResponse.json();
            console.log(fallbackApiData);
            const percent = calculatePercentageChange(fallbackApiData.data.entries[0][1], fallbackApiData.data.entries[23][1]);
            console.log(percent);
            const fallbackPriceChangePercent = percent.toFixed(2);

            // Update the cryptocurrency data with the fetched price from the fallback API
            crypto.price = fallbackPriceChangePercent.toString();

            return parseFloat(fallbackPriceChangePercent);
        } catch (fallbackApiError) {
            // console.error('Error fetching data from the fallback API:', fallbackApiError);
            return 0.00; // Return a default value if both API requests fail
        }
    }
}


function getCurrentDateTime(): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16); // Get 'YYYY-MM-DDTHH:mm'
    return formattedDate;
}

function getOneDayBeforeCurrentDate(): string {
    const currentDate = new Date();
    const oneHourBefore = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // Subtract one hour (60 minutes * 60 seconds * 1000 milliseconds)
    const formattedDate = oneHourBefore.toISOString().slice(0, 16); // Get 'YYYY-MM-DDTHH:mm'
    return formattedDate;
}

function calculatePercentageChange(oldValue: number, newValue: number): number {
    return ((newValue - oldValue) / oldValue) * 100;
}