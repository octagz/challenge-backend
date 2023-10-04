import axios, { AxiosInstance, AxiosResponse } from 'axios';

const ipApiClient: AxiosInstance = axios.create({
    baseURL: 'http://ip-api.com/json',
    timeout: 5000  // Adjust the timeout as necessary.
});

export interface IPGeoResponse {
    query: string;
    country: string;
    countryCode: string;
    zip: string;
    lat: number;
    lon: number;
    currency: string;
}

export async function fetchIPGeoInfo(ip?: string, fields?: string): Promise<IPGeoResponse> {
    try {
        const response: AxiosResponse<IPGeoResponse> = await ipApiClient.get(ip || '', {
            params: {
                fields
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching IP geo info:', error);
        throw error;
    }
}


export type LatLng = {
    lat: number;
    lng: number;
};


export function computeDistance(point1: LatLng, point2: LatLng): number {
    const R = 6371; // Earth radius in kilometers

    const dLat = toRad(point2.lat - point1.lat);
    const dLng = toRad(point2.lng - point1.lng);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Converts a degree value to radians.
 * @param value - The value in degrees.
 * @returns The value in radians.
 */
function toRad(value: number): number {
    return value * Math.PI / 180;
}