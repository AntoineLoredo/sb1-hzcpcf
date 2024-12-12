```typescript
export const COUNTRIES = ['France', 'Germany', 'Italy', 'Spain', 'UK'];

export const BUNDLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCONTINUED: 'discontinued'
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCONTINUED: 'discontinued'
} as const;

export const PURCHASE_ORDER_STATUS = {
  PENDING: 'pending',
  ORDERED: 'ordered',
  RECEIVED: 'received'
} as const;
```