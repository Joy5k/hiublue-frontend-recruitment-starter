interface UserMetrics {
    active_users: number;
    clicks: number;
    appearance: number;
}

export interface IMainData {
    current: UserMetrics;
    previous: UserMetrics;
}
