import { Controller, Get, Post } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) { }

  @Get('campaigns')
  getCampaigns(): string {
    return this.campaignsService.list()
  }

  @Post('campaigns')
  createCampaigns(): string {
    return this.campaignsService.create()
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
