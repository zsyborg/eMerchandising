// app/api/contact/route.js
import { connectDB } from "../../lib/mongodb";
import Lead from "../../lib/Lead";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();

    await client.connect();

    const database = client.db("emerch");
    const collection = database.collection("leads");

    // Insert one document into leads collection
    const result = await collection.insertOne(body);

    return new Response(
      JSON.stringify({ message: "Lead added", insertedId: result.insertedId }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close();
  }
}



// READ (GET)
export async function GET(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

        try {
            await client.connect();

            // Choose a name for your database
            const database = client.db("emerch");

            // Choose a name for your collection
            const collection = database.collection("leads");
            const allData = await collection.find({}).sort({ datetime: -1 }).toArray();
            return new Response(JSON.stringify(allData),{
                status: 200,
                headers: {'Content-Type': 'application/json'}
             });
            
        } catch (error) {
            return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
                status: 500,
                headers: {'Content-Type': 'application/json'}
              });
        } finally {
            await client.close();
        }
}
