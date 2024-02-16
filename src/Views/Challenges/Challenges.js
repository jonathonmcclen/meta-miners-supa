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
import SifiCard from "../../Components/SifiCard";
import SifiRandom from "../../Components/SifiRandom";
import SifiRandomLoader from "../../Components/SifiRandomLoader";

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
          <SifiRandom length={10} delay={1} />
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <SifiRandom length={1000} delay={1000} chars={"- "} />
            <SifiRandom length={1000} delay={1000} chars={"- "} />
            <SifiRandom length={1000} delay={1000} chars={" □"} />
          </div>
          <Stack style={{ overflowX: "scroll" }}>
            {challenges?.map((challenge, i) => (
              <>
                <Stack
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  style={{ margin: 0 }}
                >
                  {/* Body */}
                  <div style={{ height: "100%" }}>
                    <div
                      style={{
                        maxWidth: "1800px",
                        minWidth: "300px",
                        margin: "20px",
                        minHeight: "1000px",
                      }}
                      onClick={(event) => getCollection(challenge["id"])}
                    >
                      <SifiCard title={" "} subHeader={challenge["name"]}>
                        <div className="py-auto">
                          <SifiRandom length={25} delay={1000} chars={"- "} />
                        </div>
                        <img
                          height={100}
                          style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "200px",
                          }}
                          src={challenge["badge"]}
                        />
                        <br />
                      </SifiCard>
                    </div>
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
          </Stack>
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
