import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GetSearchDto, PostSearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchGet(@Query() queryParameters: GetSearchDto) {
    const { query, page, limit } = queryParameters || {};

    return this.searchService.searchDuckDuckGo(query, page, limit);
  }

  @Post()
  async searchPost(@Body() body: PostSearchDto) {
    const { query, page, limit } = body || {};
    this.searchService.saveQuery(query).catch((error) => {
      this.logger.error('Background history save failed', error);
    });

    return this.searchService.searchDuckDuckGo(query, page, limit);
  }

  @Get('history')
  async getHistory() {
    return this.searchService.getHistory();
  }
}
