import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ExchangeRatesService } from './exchangeRates.service';
import { ExchangeRateApiResponseDto } from './dtos/exchangeRateApiResponse.dto';
import { CreateExchangeCurrencyDto } from './dtos/CreateExchangeCurrency.dto';

@Controller('exchange-rates')
export class ExchangesRatesController {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

  @Get()
  getExchangeRate(): Promise<ExchangeRateApiResponseDto> {
    return this.exchangeRatesService.getExchangeRate();
  }

  @Post()
  exchangeCurrency(
    @Body(new ValidationPipe()) body: CreateExchangeCurrencyDto,
  ): Promise<number> {
    return this.exchangeRatesService.exchangeCurrency(body.amount);
  }
}
