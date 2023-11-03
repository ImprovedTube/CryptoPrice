

class CryptoListService {

    private cryptoList: string[] = [];
    private sendCryptoListCallback: ((cryptoList: string[]) => void) | null = null;

    async get_response(url: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP request failed with status: ${response.status}`);
        }
        const data = await response.json();

        return data;
    }

    async get_exchange_info() {
        const base_url = 'https://api.binance.com';
        const endpoint = '/api/v3/exchangeInfo';
        return this.get_response(base_url + endpoint);
    }

    async createSymbolsList(filter: string = 'USDT'): Promise<string[]> {
        const rows: string[] = [];
        const info = await this.get_exchange_info();
        const pairsData = info.symbols;
        const fullDataDic: Record<string, any> = {};

        pairsData.forEach((s: any) => {
            if (s.symbol.includes(filter)) {
                fullDataDic[s.symbol] = s;
            }
        });

        return Object.keys(fullDataDic);
    }

    downlaod_crypto_list() {
        this.createSymbolsList().then((data) => {
            this.cryptoList = data;
            this.sendCryptoListCallback?.(this.cryptoList);
        });
    }

    get_crypto_list() {
        return this.cryptoList;
    }

    registerSendCryptoListCallback(callback: (cryptoList: string[]) => void) {
        this.sendCryptoListCallback = callback;
    }


}

export default CryptoListService;