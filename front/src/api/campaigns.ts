import axios from 'axios'
import type { Campaign, Stats } from './type'

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getCampaigns = (filters?: {
  status?: string;
  country?: string;
  advertiser?: string;
}) => api.get<Campaign[]>('/campaigns', { params: filters }).then(r => r.data);

export const createCampaign = (data: Omit<Campaign, '_id' | 'impressionsServed'>) =>
  api.post<Campaign>('/campaigns', data).then(r => r.data);

export const getStats = () =>
  api.get<Stats>('/stats').then(r => r.data);

export const serveAd = (country: string, campaignId?: string) =>
  api.post<Campaign>('/serve-ad', { country, campaignId }).then(r => r.data);
