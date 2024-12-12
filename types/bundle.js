```js
export class Bundle {
  constructor({
    id,
    sku,
    name,
    status = 'active',
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
```