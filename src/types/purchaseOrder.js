export const PurchaseOrderStatus = {
  PENDING: 'pending',
  ORDERED: 'ordered',
  RECEIVED: 'received'
};

export class PurchaseOrder {
  constructor({
    id,
    date,
    orderNumber,
    supplier,
    status,
    items,
    totalAmount,
    estimatedDeliveryDate,
    deliveryLocation
  }) {
    this.id = id;
    this.date = date;
    this.orderNumber = orderNumber;
    this.supplier = supplier;
    this.status = status;
    this.items = items;
    this.totalAmount = totalAmount;
    this.estimatedDeliveryDate = estimatedDeliveryDate;
    this.deliveryLocation = deliveryLocation;
  }
}

export class PurchaseOrderItem {
  constructor({
    id,
    variant,
    quantity,
    unitPrice,
    totalPrice
  }) {
    this.id = id;
    this.variant = variant;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalPrice = totalPrice;
  }
}