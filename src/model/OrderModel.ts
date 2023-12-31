import mongoose from "mongoose";
const OrderModelSchema = new mongoose.Schema({
    session_id: String,
    items: Object,
    item_total_price: Object,
    total: Number,
})

const OrderModel = mongoose.model("Order", OrderModelSchema);

export default OrderModel;
