import { Injectable } from '@nestjs/common';

@Injectable()
export class TrendsService {
  getTrends() {
    // a-64: placeholder to get trending products
    return [
      { id: 1, name: 'Wireless Headphones', trendScore: 95 },
      { id: 2, name: 'Smart Watch', trendScore: 92 },
      { id: 3, name: 'Air Fryer', trendScore: 88 },
    ];
  }
}
