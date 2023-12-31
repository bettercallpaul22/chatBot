import OngoingOrderModel from "../model/OngoingOrderModel";
import { calculateTotalAmount } from "../helper/calculate_total";
import { calculateItemTotalPrice } from "../helper/get_price_total";

import diff, { WebhookClient, Card, Text, Platforms } from 'dialogflow-fulfillment'
import { Request, Response } from "express";
import { item_prices } from "../misc/misc";
import OrderModel from "../model/OrderModel";
import Order from "../model/Order";

export const send_order = async (req: Request, res: Response) => {
  const agent = new diff.WebhookClient({ request: req, response: res })
  const session_string = req.body.queryResult.outputContexts[0]['name'].split("/")[4]
  try {
    const order = await OngoingOrderModel.findOne({session_id:session_string})

    if(order){
        const new_order = new Order({
            session_id: order.session_id,
            items: order.items,
            item_total_price: order.item_total_price,
            total: order.total,
        })
        await new_order.save()
        await OngoingOrderModel.findOneAndDelete({session_id:session_string})
    
        const custom_payload = (agent: any,) => {
            const payload_data = {
    
              "richContent": [
                [
                  {
                    "type": "description",
                    "title": `Order Completed`,
                    "text": [
                      `Your order is on transit`,
                      `Order ID ${new_order._id}`
                    ]
                  },
                  {
                    "type": "chips",
                    "options": [
                        {
                            "text": "Click to view order",
                            "image": {
                              "src": {
                                "rawUrl": "https://example.com/images/logo.png"
                              }
                            },
                            "link": "https://example.com"
                          },
                    ]
                  }
                ]
              ]
            }
            agent.add(new diff.Payload(agent.UNSPECIFIED, payload_data, { sendAsMessage: true, rawPayload: true }));
          }
          let intentMap = new Map();
          intentMap.set('order_completed', custom_payload)
          agent.handleRequest(intentMap)
    
    
    
    
      }
} catch (error) {
    
    const custom_payload = (agent: any,) => {
        const payload_data = {

          "richContent": [
            [
              {
                "type": "description",
                "title": `Order Update`,
                "text": [
                  `No such order, please try again`,
                ]
              },
            
            ]
          ]
        }
        agent.add(new diff.Payload(agent.UNSPECIFIED, payload_data, { sendAsMessage: true, rawPayload: true }));
      }
      let intentMap = new Map();
      intentMap.set('order_completed', custom_payload)
      agent.handleRequest(intentMap)
}

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
