import { useEffect, useState } from "react";
// import AddSimulationCard from "../../Components/AddSimulationCard";
import SimulationCard from "../../Components/SimulationCard";
import { supabaseClient as supabase } from "../../config/supabase-client";
import { Button, Loader, Stack } from "rsuite";
import AddSimulationCard from "../../Components/AddSimulationCard";
import { useAuth } from "../../hooks/Auth";
import SpaceTravelFast from "../../Components/SpaceTravelFast";
import "./simulator.css";
import { Gear, AddOutline } from "@rsuite/icons";
import SifiCard from "../../Components/SifiCard";
import SifiRandom from "../../Components/SifiRandom";

function SimulatorList() {
  const [simulations, setSimulations] = useState(null);
  const [simulator, setSimulator] = useState(null);
  const [loading, setLoading] = useState(null);
  const [username, setUsername] = useState(null);
  const [ethercoin, setEthercoin] = useState(null);
  const [maxSims, setMaxSims] = useState(0);

  const [secondCount, setSecondCount] = useState(0);
  const [intervalSet, setIntervalSet] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    async function getSimulationsFirst() {
      setLoading(true);

      let { data, error } = await supabase
        .from("simulations")
        .select(`id, uniq, name,last_roll, created_at, sim_type ( * )`)
        .eq("user_id", user.id);

      if (error) {
        console.warn(error);
      } else if (data) {
        setSimulations(data);
      }
      setLoading(false);
    }

    async function getMaxSims() {
      let { data, error } = await supabase
        .from("profiles")
        .select(`max_sims`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setMaxSims(data["max_sims"]);
      }
    }
    getMaxSims();
    getSimulationsFirst();

    console.log(maxSims);
    console.log(simulations?.length);
  }, []);

  return (
    <>
      <div className="bg-black-500 grid grid-cols-2 px-7 py-2">
        <div className="grid-col w-full">
          <Button>Collect All</Button>
          <Button>Quick Collect</Button>
          <Button>
            <Gear />
          </Button>
        </div>
        <div className="grid-col w-full">
          <Button>SORT</Button>
        </div>
      </div>
      {loading ? (
        <div>
          <Loader size="md" center content="loading" />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap relative">
            <div className="w-full sm:w-1/3">
              <SifiCard title={"Simulator"}>
                <p>.Sims</p>
                <p>.Viva</p>
              </SifiCard>
              <SifiRandom length={10} chars={"--- "} delay={1000} />
            </div>
            <div className="w-full sm:w-2/3">
              <div
                comp-category="Layout"
                class="grid relative grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1"
              >
                {simulations?.map((sim, i) => (
                  <SimulationCard sim={sim} />
                ))}
                {maxSims && (
                  <AddSimulationCard locked={maxSims < simulations.length} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SimulatorList;
