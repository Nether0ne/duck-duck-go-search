import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistory } from './entities/searchHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SearchHistory]), HttpModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
