import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Drawer,
  Loader,
  Panel,
  PanelGroup,
  Sidebar,
  Stack,
} from "rsuite";
import { supabaseClient } from "../../config/supabase-client";
import ItemDropCard from "../../Components/ItemDropCard";
import { useAuth } from "../../hooks/Auth";

function Challenges() {
  const [loading, setLoading] = useState(null);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const [challenges, setChallenges] = useState([]);
  const [collection, setCollection] = useState([]);
  const [inventory, setInventory] = useState([]);

  // RUN ONCE
  useEffect(() => {
    async function getChallenges() {
      setLoading(true);
      let { data, error } = await supabaseClient
        .from("challenges")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.warn(error);
      } else if (data) {
        setChallenges(data);
      }
      setLoading(false);
    }

    getChallenges();
    getInventory();
    console.log(challenges);
  }, []);

  //RUN WHEN COLLECTION OR INVENTORY CHANGES
  useEffect(() => {
    inventory.forEach((el) => {
      let item = document.getElementById("item-" + el["item_id"]);
      if (item) {
        item.classList.remove("outlined");
      }
    });
  }, [inventory, collection]);

  function handleClick(challengeId) {
    getCollection(challengeId);
  }

  async function getCollection(id) {
    console.log(id);
    setOpen(true);
    let { data: collection, error } = await supabaseClient
      .from("items")
      .select("*")
      .filter("challenges", "cs", `{"${id}"}`)
      .order("rarity", { ascending: true });

    setCollection(collection);
  }

  async function getInventory() {
    let { data, error } = await supabaseClient
      .from("inventory")
      .select("item_id")
      .eq("user_id", user.id);

    console.log(data);

    if (error) {
      console.warn(error);
    } else if (data) {
      setInventory(data);
      // let item = document.getElementById("item-14");
      // item.classList.remove("outlined");

      // inventory.forEach((el) => {
      //   let item = document.getElementById("item-" + el["item_id"]);
      //   item.classList.remove("outlined");
      // });
    }
  }

  return (
    <>
      {challenges ? (
        <>
          <h1>Challenges</h1>

          {challenges?.map((challenge, i) => (
            <>
              <Stack
                direction="row"
                spacing={0}
                alignItems="center"
                style={{ margin: 0 }}
              >
                {/* Body */}
                <div style={{}}>
                  <Panel
                    onClick={(event) => getCollection(challenge["id"])}
                    style={{
                      background: "#1D202D",
                      borderRadius: "46px",
                      maxWidth: "1800px",
                      margin: "20px",
                    }}
                    header={
                      challenge["name"] + " | " + challenge["description"]
                    }
                    shaded
                  >
                    <img height={100} src={challenge["badge"]} />
                    <h4>{challenge["name"]}</h4>
                    <p>{challenge["description"]}</p>
                    <hr />
                    <p>
                      First, welcome miner! I know your itching to get started
                      mining, simulating fantastical worlds and mining them for
                      collectible resources. META MINERS is a idle mining
                      platform. Feel free to go about your business while your
                      set up simulators produce resources every 20-30 minutes.
                      as you colect items/resources you can choose to sell them
                      for eC {"("} eatherCoin {")"}. eC be used to buy resources
                      from other MINERS as well as purchase more simulation
                      types for a chance of higher rarity drops. The choice is
                      yours!
                    </p>
                  </Panel>
                </div>
              </Stack>

              {/* <Panel
                onClick={(event) => getCollection(challenge["id"])}
                value={challenge["id"]}
                header={challenge["name"] + " | " + challenge["description"]}
              >
                <img height={100} src={challenge["badge"]} />
              </Panel> */}
            </>
          ))}

          {/* DRAWER */}
          <Drawer open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <Drawer.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)} appearance="primary">
                  Confirm
                </Button>
              </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
              <Stack wrap spacing={5}>
                {collection?.map((item) => (
                  <ItemDropCard outline={true} item={item} />
                ))}
              </Stack>
            </Drawer.Body>
          </Drawer>
        </>
      ) : (
        <div>
          <Loader size="md" center content="loading" />
        </div>
      )}
    </>
  );
}

export default Challenges;
