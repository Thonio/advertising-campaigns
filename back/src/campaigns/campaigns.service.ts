import { Injectable } from '@nestjs/common';

@Injectable()
export class CampaignsService {
  list(): string {
    return 'hello campaigns'
  }

  create(): string {
    return "create campaigns"
  }

  stat(): string {
    return "This show the stat"
  }

  serveAd(): string {
    return "This serve the ad"
  }
}
