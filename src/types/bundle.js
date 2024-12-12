export const BundleStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCONTINUED: 'discontinued'
};

export class Bundle {
  constructor({
    id,
    sku,
    name,
    status = BundleStatus.ACTIVE,
    components = []
  }) {
    this.id = id;
    this.sku = sku;
    this.name = name;
    this.status = status;
    this.components = components;
  }
}

export class BundleComponent {
  constructor({
    variantSku,
    quantity
  }) {
    this.variantSku = variantSku;
    this.quantity = quantity;
  }
}