// models/Contact.js
import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    current_website: String,
    business_type: String,
    budget: String,
    decision_maker: String,
    timeline: String,
    additional_info: String
  },
  { timestamps: true, collection: "leads" }
);

export default mongoose.models.Lead ||
  mongoose.model("Lead", LeadSchema);
