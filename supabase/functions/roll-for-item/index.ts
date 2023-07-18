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

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { user_id, planet_id } = await req.json();

    /*
      req = {
        'planet_id': #
        "user_id": #
      }
    */

    let dataReturn = {};

    let { data: sim } = await supabase
      .from('simulations')
      .select('*, sim_type ( * )')
      .eq("id", planet_id)
      .single()

    if (sim["user_id"] == user_id) {
      let created_at = Date.parse(sim['created_at'])
      let now_date = Date.now()

      let dif_in_milliseconds = (now_date - created_at)
      let difMins = Math.floor((dif_in_milliseconds / 60000))

      // check that planet has at least 1/1 rolls (get algorythum form frontend)
      if (difMins > sim['sim_type']['gestation']) {

        function randomIntFromInterval(min, max) { // min and max included 
          return Math.floor(Math.random() * (max - min + 1) + min)
        }

        // roll random rarity and item
        let rarity_roll = randomIntFromInterval(1, 100)
        let rarity = 0
        if (rarity_roll > 90) {
          rarity = 3
        } else if (rarity_roll > 60) {
          rarity = 2
        } else {
          rarity = 1
        }

        // dataReturn = {
        //   success: rarity
        // }

        // get all items based on rarity and planet
        let { data: items } = await supabase
          .from('items')
          .select('id, name, path, rarity')
          .eq('rarity', rarity)
          .filter('planets', 'cs', `{"${sim["sim_type"]["id"]}"}`)

        // dataReturn = {
        //   success: items
        // }

        // roll random item
        let new_item_name = items[randomIntFromInterval(1, items.length) - 1]

        // dataReturn = {
        //   success: new_item_name
        // }

        //! check if already has item
        const { data: alreadyItem } = await supabase
          .from('inventory')
          .select('*')
          .eq('item_id', new_item_name["id"])
          .eq('user_id', user_id)
          .single()

        // dataReturn = {
        //   item: alreadyItem,
        //   already_exists: "n/a"
        // }

        //if already has item add one to amount
        if (alreadyItem && alreadyItem["count"] < 99) {

          dataReturn = {
            new_item: new_item_name,
            already_exists: true
          }

          const { data: updateItem } = await supabase
            .from('inventory')
            .update({ count: alreadyItem['count'] + 1 })
            .eq("id", alreadyItem['id'])
            .select()

        } else {

          dataReturn = {
            item: new_item_name,
            already_exists: false
          }

          // add new_item to inventory of user id
          const { data: createItem } = await supabase
            .from('inventory')
            .insert([
              { item_id: new_item_name["id"], user_id: user_id },
            ])
            .select()

        }

        // set last roll to time now - remainder of devision
        const { data: updateTime } = await supabase
          .from('simulations')
          .update({ last_roll: ((new Date()).toISOString()).toLocaleString('zh-TW') })
          .eq("id", planet_id)
          .select()

        dataReturn = {
          item: new_item_name,
          already_exists: false,
          time: ((new Date()).toISOString()).toLocaleString('zh-TW')
        }

      }


    } else {
      dataReturn = {
        success: false
      }
    }
    // const { name } = await req.json()
    // // const data = {
    // //   message: `Hello ${name}!`,
    // // }

    return new Response(
      JSON.stringify(dataReturn),
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
