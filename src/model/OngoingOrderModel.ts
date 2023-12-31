import mongoose from "mongoose";
const OngoingOrderModelSchema = new mongoose.Schema({
    session_id: String,
    items: Object,
    item_total_price: Object,
    total: Number,
})

const OngoingOrderModel = mongoose.model("OngoingOrder", OngoingOrderModelSchema);

export default OngoingOrderModel;
