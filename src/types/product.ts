export interface ProductVariant {
  id: string;
  createdAt: Date;
  currency: string;
  description: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface Product {
  id: string;
  brand?: string;
  category?: string;
  chargeTax?: boolean;
  composition?: string[];
  createdAt: Date;
  currency: string;
  currencySymbol: string;
  defaultName?: string;
  description?: string;
  displayName?: string;
  features?: string[];
  image: string;
  name: string;
  price: number;
  size?: string;
  sku: string;
  status: string;
  tags?: string[];
  updatedAt: Date;
  variants?: ProductVariant[];
}
