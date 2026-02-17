export interface Product {
  id: number;
  code: string;
  name: string;
  value: number;
}

export interface RawMaterial {
  id: number;
  code: string;
  name: string;
  stockQuantity: number;
}

export interface Composition {
  id: number;
  product: Product;
  rawMaterial: RawMaterial;
  quantityRequired: number;
}

export interface ProductionSuggestion {
  productName: string;
  quantityToProduce: number;
  totalValue: number;
}