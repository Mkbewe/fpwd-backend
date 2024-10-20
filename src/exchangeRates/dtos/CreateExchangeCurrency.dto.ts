import { IsNumber, IsPositive } from 'class-validator';

export class CreateExchangeCurrencyDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
