import { Request, Response } from "express";
import { add_order } from "../intents/add_order";

export const webhook = async (req: Request, res: Response) => {
   const intent = req.body.queryResult.intent['displayName']
   if (intent === 'add_order') {
      add_order(req, res)
   }
}
