import OngoingOrderModel from "../model/OngoingOrderModel";
import { calculateTotalAmount } from "../helper/calculate_total";

import diff, { WebhookClient, Card, Text, Platforms } from 'dialogflow-fulfillment'
import { Request, Response } from "express";
import { calculateItemTotalPrice } from "../helper/get_price_total";
import { item_prices } from "../misc/misc";

export const add_order = async (req: Request, res: Response) => {
  const agent = new diff.WebhookClient({ request: req, response: res })
  let orderList;
  const session_string = req.body.queryResult.outputContexts[0]['name'].split("/")[4]
  const matchedObject = req.body.queryResult.parameters.food_item.reduce((result: any, item: any, index: any) => {
    result[item] = req.body.queryResult.parameters.number[index];
    return result;
  }, {});


  const item_to_add = req.body.queryResult.parameters.food_item[0]
  const quantity_to_add = req.body.queryResult.parameters.number[0]
  const ongoing_order = await OngoingOrderModel.findOne({ session_id: session_string })
  if (ongoing_order) {
    if (ongoing_order.items.hasOwnProperty(item_to_add)) {
      console.log("updating new order")

      ongoing_order.items[item_to_add] = ongoing_order.items[item_to_add] + quantity_to_add;
      const get_item_prices = calculateItemTotalPrice(ongoing_order.items, item_prices)
      const get_total_amount = calculateTotalAmount(get_item_prices)

      ongoing_order.item_total_price = get_item_prices
      ongoing_order.total = get_total_amount

      const order = new OngoingOrderModel({
        session_id: ongoing_order.session_id,
        items: ongoing_order.items,
        item_total_price: ongoing_order.item_total_price,
        total: ongoing_order.total,
      })
      await order.save()
      await OngoingOrderModel.findByIdAndDelete({ _id: ongoing_order._id })
    } else {
      console.log("adding item")
      ongoing_order.items = { ...ongoing_order.items, [item_to_add]: quantity_to_add }
      const get_item_prices = calculateItemTotalPrice(ongoing_order.items, item_prices)
      const get_total_amount = calculateTotalAmount(get_item_prices)
      ongoing_order.item_total_price = get_item_prices
      ongoing_order.total = get_total_amount

      const order = new OngoingOrderModel({
        session_id: ongoing_order.session_id,
        items: ongoing_order.items,
        item_total_price: ongoing_order.item_total_price,
        total: ongoing_order.total,
      })
      await order.save()
      await OngoingOrderModel.findByIdAndDelete({ _id: ongoing_order._id })
    }
  } else {
    console.log("creating new order")
    const get_item_prices = calculateItemTotalPrice(matchedObject, item_prices)
    const get_total_amount = calculateTotalAmount(get_item_prices)
    const new_ongoing_order = new OngoingOrderModel({
      session_id: session_string,
      items: matchedObject,
      item_total_price: get_item_prices,
      total: get_total_amount
    })
    await new_ongoing_order.save()
  }


  // const items: { [key: string]: number } = ongoing_order.items
  // const prices: { [key: string]: number } = ongoing_order.item_total_price

  // Function to display the receipt
  // function displayReceipt(items: { [key: string]: number }, prices: { [key: string]: number }): void {
  // console.log("Receipt:");
  // console.log("------------------------");

  // Iterate over items
  // for (const itemName in items) {
  //   if (items.hasOwnProperty(itemName)) {
  //     const quantity = items[itemName];
  //     const itemPrice = prices[itemName];
  //     const totalPrice = quantity * itemPrice;

  //     console.log(`${itemName} x${quantity}: $${totalPrice.toFixed(2)}`);



  //     console.log("------------------------");

  //   }
  // }

  const custom_payload = (agent: any) => {
    const payload_data = {

      "richContent": [
        [
          {
            "type": "description",
            "title": "Receipt",
            "text": [
              "------------------------",
              `add order`,
              "------------------------"
            ]
          }
        ]
      ]
    }
    agent.add(new diff.Payload(agent.UNSPECIFIED, payload_data, { sendAsMessage: true, rawPayload: true }));
  }
  let intentMap = new Map();
  intentMap.set('add_order', custom_payload)
  agent.handleRequest(intentMap)
























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
}