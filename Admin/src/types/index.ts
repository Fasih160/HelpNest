export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  fundraisers: Fundraiser[];
  donations: Donation[];
};

export type Fundraiser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  description: string;
  category: string;
  image: string;
  totalAmount: number;
  amountRaised: number;
  status: string;
  user: User;
  donations: Donation[];
  created_at: string;
  updated_at: string;
};

export type Donation = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: string;
  amount: number;
  fundraiser: Fundraiser;
  user: User;
  created_at: string;
  updated_at: string;
};

export type VisitorsCount = {
  count: number;
};
