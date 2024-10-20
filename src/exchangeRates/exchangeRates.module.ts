import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangesRatesController } from './exchangeRates.controller';
import { ExchangeRatesService } from './exchangeRates.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from './entity/exchangeRate';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({ ttl: 1000 * 60 }),
    TypeOrmModule.forFeature([ExchangeRate]),
  ],
  controllers: [ExchangesRatesController],
  providers: [ConfigService, ExchangeRatesService],
})
export class ExchangeRatesModule {}
