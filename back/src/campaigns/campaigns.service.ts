import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './campaigns.dto';
import { Campaign, CampaignDocument } from './campaigns.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type FilterType = {
  country?: string,
  advertiser?: string,
  status?: string
}

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name)
    private campaignModel: Model<CampaignDocument>
  ) { }

  list(filters: FilterType): Promise<Campaign[]> {
    const query: any = {}

    if (filters.country) query.country = { $in: [filters.country] }
    if (filters.advertiser) query.adveriser = { $in: [filters.advertiser] }
    if (filters.status) query.status = { $in: [filters.status] }

    return this.campaignModel.find(query).exec()
  }

  async create(dto: CreateCampaignDto): Promise<Campaign> {
    const campaign = new this.campaignModel(dto)
    return campaign.save()
  }

  stat(): string {
    return "This show the stat"
  }

  serveAd(): string {
    return "This serve the ad"
  }
}
