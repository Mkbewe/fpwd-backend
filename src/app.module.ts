import { Module } from '@nestjs/common';
import { ExchangeRatesModule } from './exchangeRates/exchangeRates.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { validate } from './config/validate';
import { ExchangeRate } from './exchangeRates/entity/exchangeRate';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [ExchangeRate],
      synchronize: true,
    }),
    ExchangeRatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
