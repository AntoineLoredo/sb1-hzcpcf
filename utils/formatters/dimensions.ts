```typescript
export function formatWeight(weight: number): string {
  return `${weight} kg`;
}

export function formatDimensions(
  length: number,
  width: number,
  height: number,
  unit: string
): string {
  return `${length}×${width}×${height} ${unit}`;
}
```