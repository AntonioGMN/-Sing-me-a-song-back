import { Request, Response } from "express";
import reset from "../services/resetDBService.js";

export default async function resetDB(req: Request, res: Response){
  await reset()
  res.sendStatus(200);
}