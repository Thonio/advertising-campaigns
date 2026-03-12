import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto, ServeAdDto } from './campaigns.dto';
import { Campaign, CampaignDocument } from './campaigns.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type FilterType = {
  country?: string,
  advertiser?: string,
  status?: string
}

export type StatsType = {
  totalCampaigns: number,
  activeCampaigns: number,
  totalImpressions: any,
  topAdvertiser: any

}

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name)
    private campaignModel: Model<CampaignDocument>
  ) { }

  async list(filters: FilterType): Promise<Campaign[]> {
    const query: any = {}

    if (filters.country) query.targetCountries = filters.country.toUpperCase()
    if (filters.advertiser) query.adveriser = filters.advertiser
    if (filters.status) query.status = filters.status

    return this.campaignModel.find(query).exec()
  }

  async create(dto: CreateCampaignDto): Promise<Campaign> {
    const campaign = new this.campaignModel(dto)
    return campaign.save()
  }

  async stat(): Promise<StatsType> {
    const [total, active, impressions, topAdvertiser] = await Promise.all([
      this.campaignModel.countDocuments(),
      this.campaignModel.countDocuments({ status: 'active' }),
      this.campaignModel.aggregate([
        { $group: { _id: null, total: { $sum: '$impressionsServed' } } }
      ]),
      this.campaignModel.aggregate([
        { $group: { _id: '$advertiser', totalImpressions: { $sum: '$impressionsServed' } } },
        { $sort: { totalImpressions: -1 } },
        { $limit: 1 }
      ]),
    ]);

    return {
      totalCampaigns: total,
      activeCampaigns: active,
      totalImpressions: impressions[0]?.total ?? 0,
      topAdvertiser: topAdvertiser[0]?._id ?? null,
    };
  }

  async serveAd(dto: ServeAdDto): Promise<Campaign> {
    const now = new Date();

    const eligibilityQuery: any = {
      status: 'active',
      startDate: { $lte: now },
      endDate: { $gte: now },
      targetCountries: { $in: [dto.country] },
      $expr: {
        $lt: [
          { $multiply: ['$impressionsServed', 0.001] },
          '$budget',
        ],
      },
    };

    let campaign: CampaignDocument | null = null;

    if (dto.campaignId) {
      campaign = await this.campaignModel
        .findOne({ _id: dto.campaignId, ...eligibilityQuery })
        .exec();
    }

    if (!campaign) {
      campaign = await this.campaignModel
        .findOne(eligibilityQuery)
        .exec();
    }

    if (!campaign) {
      throw new NotFoundException('No eligible campaign found');
    }

    campaign.impressionsServed += 1;
    return campaign.save();
  }
}
