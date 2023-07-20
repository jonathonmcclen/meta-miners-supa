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
      user_id: int#
      sim_type: int#
      sim_name: string
    }
  */

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {

    const { user_id, sim_type, sim_name } = await req.json()
    let data = {}

    let { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq("id", user_id)

    let { data: currentSims, error } = await supabase
      .from('simulations')
      .select('*')
      .eq("user_id", user_id)

    if (user["max_sims"] > currentSims.length) {

      let { data: simPrice, error } = await supabase
        .from('sim_type')
        .select('price')
        .eq("id", sim_type)
        .single()

      if (user['ethercoin'] >= simPrice['price']) {

        const { data: simulation, error } = await supabase
          .from('simulations')
          .insert([
            { sim_type: sim_type, name: sim_name },
          ])
          .select()

        const { data: userUpdate, error } = await supabase
          .from('profiles')
          .insert([
            { ethercoin: user['ethercoin'] - simPrice['price'] },
          ])
          .eq('id', user_id)
          .select()

        data = {
          success: true,
          cost: simPrice['price'],
          new_ballance: user['ethercoin'] - simPrice['price'],
        }

      } else {
        throw new Error('You do not have enough eC (etherCoin) to purchase this simulation. keep mining and sell any resources you dont need to make some quick coin')
      }
    } else {
      throw new Error('Cant make any more simulatons on current account tier! try upgrading your account or removing simulations you dont use to make room for more')
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
