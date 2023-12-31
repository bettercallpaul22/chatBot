import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    session_id: String,
    items: Object,
    item_total_price: Object,
    total: Number,
 
})

const Order = mongoose.model("order", OrderSchema);

export default Order;
