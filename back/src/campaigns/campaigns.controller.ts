import { Body, Controller, Get, Post } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './campaigns.dto';
import { Campaign } from './campaigns.schema';

@Controller()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) { }

  @Get('campaigns')
  getCampaigns(): string {
    return this.campaignsService.list()
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
