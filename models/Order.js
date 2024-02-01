import { model, Schema, models } from "mongoose";

const OrderSchema = new Schema({
  line_items: Object,
  userName:String,
  userEmail:String,
  userCity:String,
  userPostalCode:String,
  userStreetAddress:String,
  userCountry:String,
  paid:{type:Boolean, default:false},
}, { timestamps: true });

export const Order = models.Order || model("Order", OrderSchema);