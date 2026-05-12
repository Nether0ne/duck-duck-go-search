import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSourceConfig } from './config/dataSource';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(appDataSourceConfig),
    SearchModule,
  ],
})
export class AppModule {}
