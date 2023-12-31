import OngoingOrderModel from "../model/OngoingOrderModel";
import { calculateTotalAmount } from "../helper/calculate_total";
import { calculateItemTotalPrice } from "../helper/get_price_total";

import diff, { WebhookClient, Card, Text, Platforms } from 'dialogflow-fulfillment'
import { Request, Response } from "express";
import { item_prices } from "../misc/misc";

export const send_order = async (req: Request, res: Response) => {
  const agent = new diff.WebhookClient({ request: req, response: res })
  const session_string = req.body.queryResult.outputContexts[0]['name'].split("/")[4]

  const order = await OngoingOrderModel.findOne({session_id:session_string})
  console.log('order',order)
}



















  //get total prices of item ordered
  // const get_item_prices = calculateItemTotalPrice(matchedObject, item_prices)
  // const get_total_amaount = calculateTotalAmount(get_item_prices)
  // orderList = {
  //   session: session,
  //   items: matchedObject,
  //   item_total_price: get_item_prices,
  //   total: get_total_amaount,
  // }


  // console.log(body)
  // STorage.setItem(session, JSON.stringify(orderList))
  // const data = STorage.getItem(session)
  // if (data) {
  //   const order = JSON.parse(data)



  // }


  // fulfillmentText = `hello from backend ${intent_.add_order}`;
