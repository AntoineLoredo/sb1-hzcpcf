export class Sale {
  constructor({
    id,
    date,
    orderNumber,
    customer,
    items,
    totalAmount
  }) {
    this.id = id;
    this.date = date;
    this.orderNumber = orderNumber;
    this.customer = customer;
    this.items = items;
    this.totalAmount = totalAmount;
  }
}

export class SaleItem {
  constructor({
    id,
    sku,
    quantity,
    grossPrice,
    discount,
    totalPrice
  }) {
    this.id = id;
    this.sku = sku;
    this.quantity = quantity;
    this.grossPrice = grossPrice;
    this.discount = discount;
    this.totalPrice = totalPrice;
  }
}