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
                    <Panel
                      onClick={(event) => getCollection(challenge["id"])}
                      style={{
                        background: "#1D202D",
                        borderRadius: "46px",
                        maxWidth: "1800px",
                        minWidth: "300px",
                        margin: "20px",
                        minHeight: "500px",
                      }}
                      shaded
                    >
                      <img
                        height={100}
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        src={challenge["badge"]}
                      />
                      <br />
                      <h5>{challenge["name"]}</h5>
                      <hr />
                      <p>{challenge["description"]}</p>
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
