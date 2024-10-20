import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ConfigurationValidation } from './configuration.validation';
import chalk from 'chalk';

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(ConfigurationValidation, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => {
        const constraints = Object.values(error.constraints || {}).join(', ');
        return `Property "${error.property}" has the following issues: ${constraints}`;
      })
      .join('\n');

    throw new Error(
      chalk.red(`Configuration validation failed:\n${errorMessages}`),
    );
  }

  return validatedConfig;
};
