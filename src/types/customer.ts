export interface Customer {
  address: string;
  avatar: string;
  city?: string;
  country?: string;
  createdAt: Date;
  dateOfBirth: Date;
  email: string;
  fullName: string;
  id: string;
  isFavorite?: boolean;
  isReturning?: boolean;
  isTaxExempt?: boolean;
  lastContactChannel?: string;
  lastContactDate?: Date;
  lastOrderDate: Date;
  orderedRecently?: boolean;
  ordersPlaced?: number;
  orderValue?: number;
  phone: string;
  status: string;
  storeCredit?: number;
}

export interface CustomerNote {
  content: string;
  createdAt: Date;
  id: string;
  senderAvatar: string;
  senderId: string;
  senderName: string;
}

export interface CustomerActivity {
  adminAvatar: string;
  adminId: string;
  adminName: string;
  createdAt: Date;
  id: string;
  message: string;
  type: string;
}
