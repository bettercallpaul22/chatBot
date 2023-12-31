import OngoingOrderModel from "../model/OngoingOrderModel";
import { calculateTotalAmount } from "../helper/calculate_total";
import { calculateItemTotalPrice } from "../helper/get_price_total";

import diff, { WebhookClient, Card, Text, Platforms } from 'dialogflow-fulfillment'
import { Request, Response } from "express";
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
    if (ongoing_order?.items.hasOwnProperty(item_to_add)) {
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

      const custom_payload = (agent: any,) => {
        const payload_data = {

          "richContent": [
            [
              {
                "type": "description",
                "title": `Order Update`,
                "text": [
                  `${quantity_to_add} ${item_to_add} has been added to your order`,
                  'Anything else?'
                ]
              },
              {
                "type": "chips",
                "options": [
                  {
                    "text": "No thanks that's all"
                  }
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


      await OngoingOrderModel.findByIdAndDelete({ _id: ongoing_order._id })
    } else {
      // add new item to order list
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

      const custom_payload = (agent: any,) => {
        const payload_data = {

          "richContent": [
            [
              {
                "type": "description",
                "title": `Order Update`,
                "text": [
                  `${quantity_to_add} ${item_to_add} has been added to your order`,
                  'Anything else?'
                ]
              },
              {
                "type": "chips",
                "options": [
                  {
                    "text": "No thanks that's all"
                  }
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

      await OngoingOrderModel.findByIdAndDelete({ _id: ongoing_order._id })
    }
  } else {

    // create new order
    const get_item_prices = calculateItemTotalPrice(matchedObject, item_prices)
    const get_total_amount = calculateTotalAmount(get_item_prices)
    const new_ongoing_order = new OngoingOrderModel({
      session_id: session_string,
      items: matchedObject,
      item_total_price: get_item_prices,
      total: get_total_amount
    })
    await new_ongoing_order.save()


    const custom_payload = (agent: any,) => 
    
    {
      const payload_data = {

        "richContent": [
          [
            {
              "type": "description",
              "title": `Order Created`,
              "text": [
                `${quantity_to_add} ${item_to_add} has been added to your order`,
                'Anything else?'
              ]
            },
            {
              "type": "chips",
              "options": [
                {
                  "text": "No thanks that's all"
                }
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
  }

  // const items: { [key: string]: number } = ongoing_order.items
  // const prices: { [key: string]: number } = ongoing_order.item_total_price

  // console.log("Receipt:");
  // console.log("------------------------01");
  // let result = '';
  // Iterate over items
  // for (const itemName in items) {
  //   if (items.hasOwnProperty(itemName)) {
  //     const quantity = items[itemName];
  //     const itemPrice = prices[itemName];
  //     const totalPrice = quantity * itemPrice;
  //     result = `Item total price   : $${totalPrice}`
  //     console.log(`${itemName} x${quantity}: $${totalPrice}`);
  //     console.log("------------------------02");

  //   }
  // }




















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