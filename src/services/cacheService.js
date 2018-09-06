import async from "async";
import {RateLimiter} from 'limiter'
import itemIds from "../../items";

import {productSearch} from "./productSearch";
import logger from "../../logger";

const limiter = new RateLimiter(1, 500);
function sanitizeResults (resultsArray) {
    return resultsArray.filter(itemId => itemId !== false)
}
function throttleRequests (...args) {
    return limiter.removeTokens(1, () => productSearch(...args) )
}
export async function generateLocalCache ()  {
    return await async.mapSeries(itemIds, throttleRequests, (err, resultsArray) => {
        if (err) {
            logger.error(err)
            return Promise.reject(err)
        }
        console.log(resultsArray)
        return sanitizeResults(resultsArray)
    })

}
