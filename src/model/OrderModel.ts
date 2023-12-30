import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    order_name: String,
    order_price: Number,
    order_quantity: Number,
    order_total: Number,
    order_status: String,
    order_date: Date,
    order_time: Date,
    order_address: String,
   
})

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;