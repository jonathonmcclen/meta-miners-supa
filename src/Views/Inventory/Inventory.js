import { Dropdown, Panel, Stack } from "rsuite"
import ItemCard from "../../Components/ItemCard"
import { useEffect, useState } from "react"
import { supabaseClient as supabase } from "../../config/supabase-client"
import { useAuth } from "../../hooks/Auth"



function Inventory() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useAuth();

    useEffect(() => {
        async function getInventroy() {
          setLoading(true)
    
        let { data, error } = await supabase
        .from('inventory')
        .select('*, items ( * )') 
        .eq('user_id', user.id)
        // .order('created_at', { ascending: true })
        .order('rarity', { foreignTable: 'items', ascending: true })

          if (error) {
            console.warn(error)
          } else if (data) {
            setItems(data)
          }
    
          setLoading(false)
        }
    console.log(items)
        getInventroy()
      }, [])


      async function getRarity() {
        setLoading(true)
        setItems([])
  
        let { data, error } = await supabase
        .from('inventory')
        .select('*, items ( * )') 
        .eq('user_id', user.id)
        .order('rarity', { foreignTable: 'items', ascending: true })

        if (error) {
          console.warn(error)
        } else if (data) {
          setItems(data)
        }
  
        setLoading(false)
      }

      async function getName() {
        setLoading(true)
        setItems([])
  
        let { data, error } = await supabase
        .from('inventory')
        .select('*, items ( * )') 
        .eq('user_id', user.id)
        .order('name', { foreignTable: 'items', ascending: true })

        if (error) {
          console.warn(error)
        } else if (data) {
          setItems(data)
        }
  
        setLoading(false)
      }

    return(
    <>

        <Stack direction="column" spacing={20} alignItems="center" style={{ marginTop: 30 }}>
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', maxWidth: 1000, minWidth: 1000 }}>
                <Panel>
                    <h1>Inventory</h1>
                    <Dropdown title="Sort">
                      <Dropdown.Item onClick={getName}>Alphabetical</Dropdown.Item>
                      <Dropdown.Item onClick={getRarity}>Rarity</Dropdown.Item>
                      <Dropdown.Item>Simulation Type</Dropdown.Item>
                      <Dropdown.Item>Most Recent</Dropdown.Item>
                      <Dropdown.Item>Amount</Dropdown.Item>
                    </Dropdown>
                    <hr/>
                    <Stack wrap spacing={6}>
                        {items.map((item) => ( <ItemCard item={item}/> ))}
                    </Stack>  
                </Panel>
            </Panel>
        </Stack>
    </>)
}

export default Inventory