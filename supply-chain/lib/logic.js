'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.fsc.biznet.ChangeAssetValue} changeAssetValue
 * @transaction
 */
function onChangeAssetValue(changeAssetValue) {
    var assetRegistry;
    var id = changeAssetValue.relatedAsset.assetId;
    return getAssetRegistry('org.fsc.biznet.SampleAsset')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = changeAssetValue.newValue;
            return assetRegistry.update(asset);
        });
}

function tradeCommodity(trade) {
    trade.commodity.owner = trade.newOwner;
    return getAssetRegistry('org.fsc.biznet.Commodity').then(function(assetRegistry){
        return assetRegistry.update(trade.commodity);
    });
}