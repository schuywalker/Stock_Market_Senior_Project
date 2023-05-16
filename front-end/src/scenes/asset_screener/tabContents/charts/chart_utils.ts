import {OHLC} from './OHLC'

export function mapSeries(OHLC: OHLC[]) {
    if (!OHLC) {
        return []
    }
    return OHLC.map((ohlc) => {
        return {
            data: [
                {
                    x: ohlc.date,
                    y: [ohlc.open, ohlc.high, ohlc.low, ohlc.close],
                },
            ],
        }
    })
}

// export function mapCategories(OHLC: OHLC[]) {
//     if (!OHLC) {
//         return []
//     }
//     return OHLC.map((ohlc) => {
//         //  customize... if state.interval == 1d return [1h 1h 1h] elif state.period = 1y ret 1m 1m 1m etc.
//         return ohlc.date
//     })
// }
