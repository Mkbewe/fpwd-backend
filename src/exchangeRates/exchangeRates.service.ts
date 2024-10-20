import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ExchangeRateApiResponseDto } from './dtos/exchangeRateApiResponse.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from './entity/exchangeRate';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeRatesService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(ExchangeRatesService.name);
  private readonly cacheKey = 'exchange_rate';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>,
  ) {
    this.apiUrl = this.configService.get<string>('exchangeRatesApi.url');
    this.apiKey = this.configService.get<string>('exchangeRatesApi.key');
  }

  async getExchangeRate(): Promise<ExchangeRateApiResponseDto> {
    const cachedExchangeRate =
      await this.cacheManager.get<ExchangeRateApiResponseDto>(this.cacheKey);

    if (cachedExchangeRate) {
      this.logger.log(
        `Fetching exchange rate from cache: ${cachedExchangeRate.exchange_rate}`,
      );
      return cachedExchangeRate;
    }

    const response = await firstValueFrom(
      this.httpService.get<ExchangeRateApiResponseDto>(this.apiUrl, {
        headers: {
          'x-api-key': this.apiKey,
        },
      }),
    );

    await this.cacheManager.set(this.cacheKey, response.data);
    this.logger.log(
      `Fetching exchange rate from API: ${response.data.exchange_rate}`,
    );
    return response.data;
  }

  async exchangeCurrency(amount: number): Promise<number> {
    const cachedExchangeRate =
      await this.cacheManager.get<ExchangeRateApiResponseDto>(this.cacheKey);

    if (!cachedExchangeRate) {
      throw new NotFoundException('Exchange rate not available');
    }

    const exchangeAmount =
      Math.round(amount * cachedExchangeRate.exchange_rate * 100) / 100;

    const exchangeRate = this.exchangeRateRepository.create({
      amount,
      exchangeAmount,
      exchangeRate: cachedExchangeRate.exchange_rate,
      date: new Date().toISOString(),
    });
    await this.exchangeRateRepository.save(exchangeRate);

    return exchangeAmount;
  }
}
