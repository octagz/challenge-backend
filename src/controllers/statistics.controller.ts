import { Request, Response } from "express";
import { calculateMetrics } from "../services/get-trace.service";


export async function statsController(req: Request, res: Response){
    try {
        const results = await calculateMetrics()
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({ error: "Couldn't compute metrics" })
    }
};