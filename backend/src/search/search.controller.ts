import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GetSearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchGet(@Query() queryParameters: GetSearchDto) {
    const { query, page, limit } = queryParameters || {};
    console.log(queryParameters);
    return this.searchService.searchDuckDuckGo(query, page, limit);
  }
}
