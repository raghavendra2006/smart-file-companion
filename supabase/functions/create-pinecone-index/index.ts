import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, email } = await req.json();
    
    if (!userId || !email) {
      throw new Error("Missing userId or email");
    }

    const pineconeApiKey = Deno.env.get("PINECONE_API_KEY");
    if (!pineconeApiKey) {
      throw new Error("Pinecone API key not configured");
    }

    // Create a unique index name for this user (sanitized)
    const indexName = `user-${userId.replace(/-/g, "").substring(0, 20)}`;

    // Create index in Pinecone
    const createIndexResponse = await fetch("https://api.pinecone.io/indexes", {
      method: "POST",
      headers: {
        "Api-Key": pineconeApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: indexName,
        dimension: 1536,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      }),
    });

    // Check if index already exists (409) or created successfully
    if (createIndexResponse.status === 409) {
      console.log(`Index ${indexName} already exists`);
    } else if (!createIndexResponse.ok && createIndexResponse.status !== 201) {
      const errorText = await createIndexResponse.text();
      console.error("Pinecone error:", errorText);
      throw new Error(`Failed to create Pinecone index: ${errorText}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        indexName,
        message: "Pinecone index created successfully" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
