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
    const [maxSims, setMaxSims] = useState(0)

    const [secondCount, setSecondCount] = useState(0)
    const [intervalSet, setIntervalSet] = useState(false)

    const { user } = useAuth()

    useEffect(() => {
        
        async function getSimulationsFirst() {
            setLoading(true) 
      
            let { data, error } = await supabase
              .from('simulations')
              .select(`id, uniq, name,last_roll, created_at, sim_type ( * )`)
              .eq('user_id', user.id)  
       
            if (error) {
              console.warn(error)
            } else if (data) {
              setSimulations(data)
            }
            setLoading(false)
        }

        async function getMaxSims() {
    
          let { data, error } = await supabase
            .from('profiles')
            .select(`max_sims`)
            .eq('id', user.id)  
            .single() 
     
          if (error) {
            console.warn(error)
          } else if (data) {
            setMaxSims(data['max_sims'])
          }
      }
        getMaxSims()
        getSimulationsFirst()

        console.log(maxSims)
        console.log(simulations?.length)
 


        
      }, [])



    return(
    <>
    {loading ?
        <div>
          <Loader center content="loading" />
        </div>
      :
        <Stack wrap spacing={6}>
          {simulations?.map((sim, i) => ( <SimulationCard sim={sim}/> ))}
          {maxSims && 
            <AddSimulationCard locked={maxSims < simulations.length}/>
          }
        </Stack>
}
    </>
    )
}
export default Simulator;
