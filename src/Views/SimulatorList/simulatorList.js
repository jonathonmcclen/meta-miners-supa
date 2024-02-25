import { useEffect, useState } from "react";
// import AddSimulationCard from "../../Components/AddSimulationCard";
import SimulationCard from "../../Components/SimulationCard";
import { BsListColumnsReverse } from "react-icons/bs";

import { supabaseClient as supabase } from "../../config/supabase-client";
import { Loader, Stack } from "rsuite";
import AddSimulationCard from "../../Components/AddSimulationCard";
import { useAuth } from "../../hooks/Auth";
import SpaceTravelFast from "../../Components/SpaceTravelFast";
import "./simulator.css";
import { Gear, AddOutline } from "@rsuite/icons";
import SifiCard from "../../Components/SifiCard";
import SifiRandom from "../../Components/SifiRandom";
import SimulationListItem from "./SimulationListItem";
import Button1 from "../../Components/Button1";
import { Link } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";

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
    console.log(simulations);
  }, []);

  return (
    <>
      <div className="bg-black-500 grid grid-cols-2 px-7 py-2">
        <div className="grid-col w-full">
          <div className="flex flex-nowrap">
            <Button1>Collect All</Button1>
            <Button1>
              <Gear />
            </Button1>
            <Button1>SORT</Button1>
            <div className="inline-block float-right">
              <Link to="/simulator">
                <BsListColumnsReverse className="text-[25px]" />
                <BiDotsHorizontalRounded className="text-[25px]" />
              </Link>
            </div>
          </div>
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
              <div comp-category="Layout" className="">
                {simulations?.map((sim, i) => (
                  // <div>
                  //   {sim.name} | 0 / {sim.gestation} {sim.uniq}
                  // </div>
                  <SimulationListItem sim={sim} />
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
