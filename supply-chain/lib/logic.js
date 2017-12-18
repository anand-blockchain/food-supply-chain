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
        var tradeNotification =  getFactory().newEvent('org.fsc.biznet', 'TradeNotification');
        tradeNotification.commodity = trade.commodity;
        emit(tradeNotification);
        return assetRegistry.update(trade.commodity);
    });
}

function RemoveHighQuantityCommodities(remove){
    return getAssetRegistry('org.fsc.biznet.Commodity').then(function(assetRegistry){
        return query('selectCommoditiesWithHighQuantity').then(function(results){
            var promise = [];
            for(var i in results){
                var trade = results[i];
                var removeNotification = getFactory().newEvent('org.fsc.biznet', 'RemoveNotification');
                emit(removeNotification);
                promise.push(assetRegistry.remove(trade));
            }
            return Promise.all(promise);
        })
    })
}