export interface Campaign {
  _id: string;
  name: string;
  advertiser: string;
  startDate: string;
  endDate: string;
  budget: number;
  impressionsServed: number;
  targetCountries: string[];
  status: 'active' | 'paused' | 'ended';
}

export interface Stats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalImpressions: number;
  topAdvertiser: string | null;
}
