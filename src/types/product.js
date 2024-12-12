export const ProductStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCONTINUED: 'discontinued'
};

export const VersionChangeReason = {
  INITIAL: 'initial',
  SUPPLIER_CHANGE: 'supplier_change',
  SPECIFICATION_UPDATE: 'specification_update',
  PRICE_UPDATE: 'price_update',
  DISCONTINUED: 'discontinued'
};

export class ProductVariant {
  constructor({
    id,
    name,
    sku,
    option1Type,
    option1Value,
    option2Type,
    option2Value,
    option3Type,
    option3Value,
    version,
    status,
    isPrimary,
    supplier,
    weight,
    dimensions,
    isBundle,
    isFromRawMaterial,
    moq,
    leadTimeWeeks,
    safetyStockWeeks,
    purchasePrice,
    logisticCost,
    imageUrl,
    versionHistory = []
  }) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.option1Type = option1Type;
    this.option1Value = option1Value;
    this.option2Type = option2Type;
    this.option2Value = option2Value;
    this.option3Type = option3Type;
    this.option3Value = option3Value;
    this.version = version;
    this.status = status;
    this.isPrimary = isPrimary;
    this.supplier = supplier;
    this.weight = weight;
    this.dimensions = dimensions;
    this.isBundle = isBundle;
    this.isFromRawMaterial = isFromRawMaterial;
    this.moq = moq;
    this.leadTimeWeeks = leadTimeWeeks;
    this.safetyStockWeeks = safetyStockWeeks;
    this.purchasePrice = purchasePrice;
    this.logisticCost = logisticCost;
    this.imageUrl = imageUrl;
    this.versionHistory = versionHistory;
  }

  createNewVersion(changes, reason) {
    const currentVersion = { ...this };
    delete currentVersion.versionHistory;
    
    const newVersion = {
      ...this,
      ...changes,
      version: this.version + 1,
      versionHistory: [
        ...this.versionHistory,
        {
          date: new Date(),
          version: this.version,
          reason,
          changes: Object.keys(changes).reduce((acc, key) => {
            if (this[key] !== changes[key]) {
              acc[key] = {
                from: this[key],
                to: changes[key]
              };
            }
            return acc;
          }, {}),
          previousState: currentVersion
        }
      ]
    };

    return new ProductVariant(newVersion);
  }
}