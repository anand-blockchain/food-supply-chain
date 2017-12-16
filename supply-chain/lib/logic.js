'use strict';
/**
 * Write your transction processor functions here
 */


/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fsc.biznet.Trade} trade - the trade to be processed
 * @transaction
 */
function tradeCommodity(trade) {
    trade.commodity.owner = trade.newOwner;
    return getAssetRegistry('org.fsc.biznet.Commodity').then(function(assetRegistry){
        return assetRegistry.update(trade.commodity);
    });
}