import { Panel, Placeholder, Stack } from "rsuite";
import ReleaseNotes from "../Components/ReleaseNotes";
import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../config/supabase-client";

function WelcomePage() {
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    async function getReleases() {
      setLoading(true);

      let { data, error } = await supabase
        .from("releases")
        .select("*")
        // .order('created_at', { ascending: true })
        .order("created_at", { ascending: true });

      if (error) {
        console.warn(error);
      } else if (data) {
        setReleases(data);
      }
      setLoading(false);
    }

    getReleases();
  }, []);

  return (
    <Stack direction="column" spacing={20} style={{ marginTop: 30 }}>
      <h1>Welcome to META MINERS!</h1>
      <Panel
        style={{ background: "#1D202D", borderRadius: "46px" }}
        header=""
        shaded
      >
        <h2>Getting Started</h2>
        <p>
          First, welcome miner! I know your itching to get started mining,
          simulating fantastical worlds and mining them for collectible
          resources. META MINERS is a idle mining platform. Feel free to go
          about your business while your set up simulators produce resources
          every 20-30 minutes. as you colect items/resources you can choose to
          sell them for eC {"("} eatherCoin {")"}. eC be used to buy resources
          from other MINERS as well as purchase more simulation types for a
          chance of higher rarity drops. The choice is yours!
          <hr />
          <ol>
            <li>Create a new simulation</li>
            <p>by defualt a free account is allowed 3 simulations</p>
            {/* <li>Wait for civilization to form and develop</li>
                <p></p> */}
            <li>Then your simulator will start working for you</li>
            <p>some worlds take longer to output resources than others</p>
            <li></li>
          </ol>
        </p>
      </Panel>
      {releases.map((note) => (
        <ReleaseNotes header={note["header"]} content={note["content"]} />
      ))}
    </Stack>
  );
}

export default WelcomePage;
