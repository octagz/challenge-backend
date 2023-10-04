import express, { Request, Response } from "express";
import axios from "axios";
import { body, validationResult } from "express-validator"
import { convertedCurrency, convertCurrency } from "../services/convertion.service"
import { IPGeoResponse, LatLng, computeDistance, fetchIPGeoInfo } from "../services/geolocation.service"


const USA_CUR = "USD"

export const validationsTraces = [
    body("ip").notEmpty().isIP()
]

export async function tracesController(req: Request, res: Response){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const ip: string = req.body.ip;
    try {
        // Use IP geolocation service
        const geoData: IPGeoResponse = await fetchIPGeoInfo(ip,"country,countryCode,zip,lat,lon,currency")
        // Use currency service
        const currencyData: convertedCurrency[] = await convertCurrency(
            geoData.currency,
            USA_CUR
        );
        const originCoods: LatLng = {
            lat: geoData.lat,
            lng: geoData.lon
        }
        const usaCoords: LatLng = {
            lat: 38.896360099565925,
            lng: -77.04795855389095,
        }
        
        const distance: number = computeDistance(originCoods, usaCoords);
  
        // Form and send the response.
        res.json({
            ip: geoData.query,
            name: geoData.country,
            code: geoData.countryCode,
            lat: geoData.lat,
            lon: geoData.lon,
            currencies: currencyData,
            distance_to_usa: distance
        });
  
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data."});
    }
  };