import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GetSearchDto, PostSearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchGet(@Query() queryParameters: GetSearchDto) {
    const { q, page, limit } = queryParameters || {};

    return this.searchService.searchDuckDuckGo(q, page, limit);
  }

  @Post()
  async searchPost(@Body() body: PostSearchDto) {
    const { q, page, limit } = body || {};
    this.searchService.saveQuery(q).catch((error) => {
      this.logger.error('Background history save failed', error);
    });

    return this.searchService.searchDuckDuckGo(q, page, limit);
  }

  @Get('history')
  async getHistory() {
    return this.searchService.getHistory();
  }
}
