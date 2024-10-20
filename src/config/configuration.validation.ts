import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ConfigurationValidation {
  @IsNotEmpty()
  @IsInt()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  EXCHANGE_RATES_API_URL: string;

  @IsNotEmpty()
  @IsString()
  EXCHANGE_RATES_API_KEY: string;
}
