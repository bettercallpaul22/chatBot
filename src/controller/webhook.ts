import { Request, Response } from "express";
import { add_order } from "../intents/add_order";
import { remove_order } from "../intents/remove_order";
import { send_order } from "../intents/send_order";

export const webhook = async (req: Request, res: Response) => {
   const intent = req.body.queryResult.intent['displayName']
   intent === 'add_order' && add_order(req, res)
   intent === 'remove_order' && remove_order(req, res)
   intent === 'order_completed' && send_order(req, res)
      
   
}
