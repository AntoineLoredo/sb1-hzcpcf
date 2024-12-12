export interface ForecastData {
  sku: string;
  supplier: string;
  existingStock: number;
  averageSalesPerWeek: number;
  safetyStock: number;
  weeklyForecast: number[];
}