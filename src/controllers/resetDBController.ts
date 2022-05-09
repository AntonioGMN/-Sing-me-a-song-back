import { Request, Response } from "express";
import * as resetService from "../services/resetDBService.js";

export default async function resetDB(req: Request, res: Response){
  await resetService.reset();
  res.sendStatus(200);
}