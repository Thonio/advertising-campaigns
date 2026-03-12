import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './campaigns.dto';
import { Campaign } from './campaigns.schema';

@Controller()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) { }

  @Get('campaigns')
  getCampaigns(
    @Query('country') country?: string,
    @Query('advertiser') advertiser?: string,
    @Query('status') status?: string
  ): Promise<Campaign[]> {
    return this.campaignsService.list({ country, advertiser, status })
  }

  @Post('campaigns')
  createCampaigns(@Body() dto: CreateCampaignDto): Promise<Campaign> {
    return this.campaignsService.create(dto)
  }

  @Get('stats')
  getStats(): string {
    return this.campaignsService.stat()
  }

  @Post('serve-ad')
  serveAds(): string {
    return this.campaignsService.serveAd()
  }

}
