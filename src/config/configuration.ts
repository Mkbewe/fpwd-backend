export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  exchangeRatesApi: {
    url: process.env.EXCHANGE_RATES_API_URL,
    key: process.env.EXCHANGE_RATES_API_KEY,
  },
});
