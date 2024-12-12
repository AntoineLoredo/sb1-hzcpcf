```typescript
export interface Bundle {
  id: string;
  sku: string;
  name: string;
  status: 'active' | 'inactive' | 'discontinued';
  components: BundleComponent[];
}

export interface BundleComponent {
  variantSku: string;
  quantity: number;
}

export interface BundleFormData {
  sku: string;
  name: string;
  status: 'active' | 'inactive' | 'discontinued';
  components: BundleComponent[];
}
```