import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';

export const appDataSourceConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
} satisfies DataSourceOptions;

const appDataSource = new DataSource(appDataSourceConfig);

export default appDataSource;
