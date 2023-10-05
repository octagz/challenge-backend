import axios, { AxiosInstance, AxiosResponse } from 'axios';


const fixerClient: AxiosInstance = axios.create({
    baseURL: 'http://data.fixer.io/api',
    timeout: 5000,
});

export interface ConversionResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: {
        [currencyCode: string]: number;
    }
}

export interface convertedCurrency {
    iso: string;
    conversion_rate: number;
}

export async function convertCurrency(from: string, to: string): Promise<convertedCurrency[]> {
    try {
        const response: AxiosResponse<ConversionResponse> = await fixerClient.get('/latest', {
            params: {
                access_key: process.env.FIXER_API_KEY,
                symbols: `${from},${to}`,
            }
        });
        const conversionRate = response.data.rates[from] / response.data.rates[to]

        const currencies: convertedCurrency[] = [
          {
            iso: from,
            conversion_rate: conversionRate,
          },
          {
            iso: to,
            conversion_rate: 1,
          },
        ];

        return currencies;
    } catch (error) {
        console.error('Error during currency conversion:', error);
        throw error;
    }
}