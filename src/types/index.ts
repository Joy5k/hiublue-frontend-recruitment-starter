interface UserMetrics {
    active_users: number;
    clicks: number;
    appearance: number;
}

export interface IMainData {
    current: UserMetrics;
    previous: UserMetrics;
}

export interface IOffer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: "accepted" | "rejected" | "pending";
  type: string;
  price: number;
}