enum Cryptocurrencies {
    BTC = 'BTC',
    ETH = 'ETH',
    LTC = 'LTC',
}

interface Cryptocurrency {
    name: string;
    ws_address: string;
    price: string;
    color: string;
}

const CryptocurrencyMap: Map<Cryptocurrencies, Cryptocurrency> = new Map([
    [Cryptocurrencies.BTC, { name: 'Bitcoin', ws_address: 'wss://stream.binance.com:9443/ws/btcusdt@trade', price: '0.0', color: 'gray.200' }],
    [Cryptocurrencies.ETH, { name: 'Ethereum', ws_address: 'wss://stream.binance.com:9443/ws/ethusdt@trade', price: '0.0', color: 'gray.200' }],
    [Cryptocurrencies.LTC, { name: 'Litecoin', ws_address: 'wss://stream.binance.com:9443/ws/ltcusdt@trade', price: '0.0', color: 'gray.200' }],
]);

export default Cryptocurrency;
export { Cryptocurrencies, CryptocurrencyMap };