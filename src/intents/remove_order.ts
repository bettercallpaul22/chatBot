import OngoingOrderModel from "../model/OngoingOrderModel";

import { calculateTotalAmount } from "../helper/calculate_total";
import { calculateItemTotalPrice } from "../helper/get_price_total";

import { item_prices } from "../misc/misc";

import diff, { WebhookClient, Card, Text, Platforms } from 'dialogflow-fulfillment'
import { Request, Response } from "express";

export const remove_order = async (req: Request, res: Response) => {
    const agent = new diff.WebhookClient({ request: req, response: res })
    let orderList;
    const session_id = req.body.queryResult.outputContexts[0]['name'].split("/")[4]

    const item_to_remove = req.body.queryResult.parameters.food_item
    const item_quantity = req.body.queryResult.parameters.number
    const ongoing_order = await OngoingOrderModel.findOne({ session_id: session_id })
    if (ongoing_order) {
        if (ongoing_order?.items.hasOwnProperty(item_to_remove)) {
            let update_order: any = {};
            update_order = ongoing_order
            if (update_order.items[item_to_remove] === item_quantity) {
                let newObj = { ...ongoing_order.items };
                delete newObj[item_to_remove]
                ongoing_order.items = newObj;
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

                const custom_payload = (agent: any, ) => {
                    const payload_data = {
                
                      "richContent": [
                        [
                          {
                            "type": "description",
                            "title": `Order Update`,
                            "text":[
                                `${item_to_remove} has been removed from your order`,
                              ]
                             
                            
                          }
                        ]
                      ]
                    }
                    agent.add(new diff.Payload(agent.UNSPECIFIED, payload_data, { sendAsMessage: true, rawPayload: true }));
                  }
                  let intentMap = new Map();
                  intentMap.set('remove_order', custom_payload)
                  agent.handleRequest(intentMap)

                await OngoingOrderModel.findByIdAndDelete({ _id: ongoing_order._id })

            } else if (update_order.items[item_to_remove] < item_quantity) {
                let newObj = { ...ongoing_order.items };
                delete newObj[item_to_remove]
                ongoing_order.items = newObj;
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

                const custom_payload = (agent: any, ) => {
                    const payload_data = {
                
                      "richContent": [
                        [
                          {
                            "type": "description",
                            "title": `Order Update`,
                            "text":[
                               `${item_to_remove} has been removed from your order`,
                              ]
                             
                            
                          }
                        ]
                      ]
                    }
                    agent.add(new diff.Payload(agent.UNSPECIFIED, payload_data, { sendAsMessage: true, rawPayload: true }));
                  }
                  let intentMap = new Map();
                  intentMap.set('remove_order', custom_payload)
                  agent.handleRequest(intentMap)

                await OngoingOrderModel.findByIdAndDelete({ _id: ongoing_order._id })
            } else {

                ongoing_order.items[item_to_remove] = ongoing_order.items[item_to_remove] - item_quantity;
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

                const custom_payload = (agent: any, ) => {
                    const payload_data = {
                
                      "richContent": [
                        [
                          {
                            "type": "description",
                            "title": `Order Update`,
                            "text":[
                               `${item_quantity} ${item_to_remove} has been removed from your order`,
                              ]
                             
                            
                          }
                        ]
                      ]
                    }
                    agent.add(new diff.Payload(agent.UNSPECIFIED, payload_data, { sendAsMessage: true, rawPayload: true }));
                  }
                  let intentMap = new Map();
                  intentMap.set('remove_order', custom_payload)
                  agent.handleRequest(intentMap)

                await OngoingOrderModel.findByIdAndDelete({ _id: ongoing_order._id })
            }


        } else {
            console.log("no such item in basket")
        }




    } else {
        console.log("no order of such")

    }


}


