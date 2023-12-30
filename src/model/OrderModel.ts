import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: String,
  
})
const OrderModel = mongoose.model("Order", OrderSchema)

export default OrderModel;