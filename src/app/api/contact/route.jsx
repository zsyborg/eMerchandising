// app/api/contact/route.js
import { connectDB } from "../../lib/mongodb";
import Lead from "../../lib/Lead";
import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const newLead = await Lead.create(body);

    return new Response(JSON.stringify(newLead), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to save" }), {
      status: 500,
    });
  }
}



// READ (GET)
export async function GET() {
  try {
    await connectDB();

    const contacts = await Lead.find().sort({ createdAt: -1 }); // latest first

    return new Response(JSON.stringify(contacts), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
