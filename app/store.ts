export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type Order = {
  id: number;
  userId: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
};

export const store: {
  users: User[];
  orders: Order[];
} = {
  users: [],
  orders: [],
};
