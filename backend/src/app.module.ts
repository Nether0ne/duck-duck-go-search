import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSourceConfig } from './config/dataSource';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_TTL_MS } from './common/constants/cache';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(appDataSourceConfig),
    CacheModule.register({ isGlobal: true, ttl: CACHE_TTL_MS }),
    SearchModule,
  ],
})
export class AppModule {}
