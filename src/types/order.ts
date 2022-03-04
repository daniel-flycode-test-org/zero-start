export interface Order {
  id: string;
  courier: string;
  createdAt: Date;
  currency: string;
  currencySymbol: string;
  customer: {
    address?: string;
    city: string;
    country: string;
    email?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    stripeId?: string;
  };
  discountAmount?: number;
  lineItems: [
    {
      currency: string;
      currencySymbol: string;
      discountAmount: number;
      image: string;
      name: string;
      quantity: number;
      sku: string;
      subtotalAmount: number;
      taxAmount: number;
      totalAmount: number;
      unitAmount: number;
    }
  ];
  paymentId?: string;
  paymentMethod: string;
  paymentStatus?: string;
  status: string;
  trackingCode?: string;
  subtotalAmount?: number;
  taxAmount?: number;
  totalAmount: number;
  updatedAt: Date;
}
