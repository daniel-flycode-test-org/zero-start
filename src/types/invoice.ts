export interface Invoice {
  createdAt?: Date;
  currencySymbol: string;
  customerName?: string;
  dueDate: Date;
  id: string;
  issueDate: Date;
  lineItems?: [
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
      isTaxable: boolean;
    }
  ];
  subtotalAmount?: number;
  taxAmount?: number;
  note?: string;
  paymentAt?: Date;
  paymentMethod?: string;
  paymentStatus?: string;
  status: string;
  totalAmount: number;
  transactionId?: string;
  transactionFees?: number;
}
