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

        getSimulationsFirst()
        
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
          <AddSimulationCard/>
        </Stack>
}
    </>
    )
}
export default Simulator;
