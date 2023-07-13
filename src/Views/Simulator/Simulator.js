import { useEffect, useState } from "react";
// import AddSimulationCard from "../../Components/AddSimulationCard";
import SimulationCard from "../../Components/SimulationCard";
import { supabaseClient as supabase} from "../../config/supabase-client";
import { Loader, Stack } from "rsuite";
import AddSimulationCard from "../../Components/AddSimulationCard";
import { useAuth } from "../../hooks/Auth";



function Simulator(){
    const [simulations, setSimulations] = useState(null)
    const [simulator, setSimulator] = useState(null)
    const [loading, setLoading] = useState(null)
    const [username, setUsername] = useState(null)
    const [ethercoin, setEthercoin] = useState(null)

    const [test, setTest] = useState(null)

    const { user } = useAuth()

    useEffect(() => {
        
        async function getSimulations() {
            setLoading(true) 
      
            let { data, error } = await supabase
              .from('simulations')
              .select(`uniq, name, created_at, sim_type ( * )`)
              .eq('user_id', user.id)  
       
            if (error) {
              console.warn(error)
            } else if (data) {
              setSimulations(data)
            }
      
            setLoading(false)
        }

        async function testabc() {
          setLoading(true)  
    
          let { data, error } = await supabase
            .from('sim_types')
            .select(`*`)
            .filter('items', 'cs', '{"8"}')  
            // .cs('items', 3)   
      
          if (error) {
            console.warn(error)
          } else if (data) {
            setTest(data)
          }
    
          setLoading(false)
      }

        getSimulations()
        // testabc()

        console.log(test) 
      }, [user])



    return(
    <>
    {loading ?
        <div>
          <Loader center content="loading" />
        </div>
      :
        <Stack wrap spacing={6}>
          {simulations?.map((sim, i) => ( <SimulationCard sim={sim}/> ))}
          <AddSimulationCard/>
        </Stack>
}
    </>
    )
}
export default Simulator;
