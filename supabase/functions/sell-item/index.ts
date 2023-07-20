// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.0"
// import { corsHeaders } from "../../_shared/cors";

const supUrl: string = Deno.env.get("_SUPABASE_URL")
const supKey: string = Deno.env.get("_SUPABASE_SERVICE_KEY")
const supabase = createClient(supUrl, supKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {

  /*
    req = {
      user_id: int#,
      item_id: int#
    }
  */

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {

    const { user_id, item_id } = await req.json()
    let data = {}

    let { data: item, error } = await supabase
      .from('inventory')
      .select('*, items(*)')
      .eq('id', item_id)
      .single()


    if (item['count'] >= 1 && item['user_id'] == user_id) {

      // decrease count
      let { data: itemUpdate, error: a } = await supabase
        .from('inventory')
        .update({ count: item['count'] - 1 })
        .eq('id', item_id)
        .single()

      //add sell amount to user 
      let { data: user, error: c } = await supabase
        .from('profiles')
        .select()
        .eq('id', user_id)
        .single()

      let { data: userUpdate, error: b } = await supabase
        .from('profiles')
        .update({ ethercoin: `${user['ethercoin'] + item['items']['sell_price']}` })
        .eq('id', user_id)
        .single()

      data = {
        sold: true,
        amount: item['items']['sell_price']
      }

    } else if (item['count'] <= 0) {
      data = { success: false }
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      },

    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, // and here
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
