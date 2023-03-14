interface DisplayGroup {
    name: string;
    ticker: string;
    price: number;
    perChange: number;
    earnings: any;
    threeArticles?: string;
    marketCap: number;
    peRatio: number;
    peRatioTTM: number;
    dividendYield: number;
}

export default DisplayGroup;
