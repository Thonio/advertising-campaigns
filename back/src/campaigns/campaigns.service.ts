import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './campaigns.dto';
import { Campaign, CampaignDocument } from './campaigns.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name)
    private campaignModel: Model<CampaignDocument>
  ) { }

  list(): string {
    return 'hello campaigns'
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
