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

function Simulator() {
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
      <div style={{ backgroundColor: "black", height: "70px" }}>
        <Button>Collect All</Button>
        <Button>Quick Collect</Button>
        <Button>
          <Gear />
        </Button>
      </div>
      {loading ? (
        <div>
          <Loader size="md" center content="loading" />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url("https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/space/wallpaperflare.com_wallpaper%20(1).jpg?t=2023-08-11T05%3A38%3A41.489Z")`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "87vh",
          }}
        >
          <Stack wrap spacing={35}>
            {simulations?.map((sim, i) => (
              <SimulationCard sim={sim} />
            ))}
            {maxSims && (
              <AddSimulationCard locked={maxSims < simulations.length} />
            )}
          </Stack>
        </div>
      )}
    </>
  );
}
export default Simulator;
