import { useEffect, useState } from "react";
import {
  Avatar,
  ButtonGroup,
  Col,
  Drawer,
  Input,
  Loader,
  Panel,
  Placeholder,
  Progress,
  Row,
  Stack,
  Tag,
} from "rsuite";
import { useAuth } from "../../../hooks/Auth";
import { MdEdit } from "react-icons/md";

import { FaUsers } from "react-icons/fa";
import { GiMedicalPackAlt, GiBurstBlob } from "react-icons/gi";
import { supabaseClient } from "../../../config/supabase-client";
import ItemDropCard from "../../../Components/ItemDropCard";
import FlippableCard from "../../../Components/FlippableCard";
import Modal from "../../../Components/Modal";
import Button from "../../../Components/Button";

function SimulationListItem({ sim }) {
  const [percent, setPercent] = useState(0); //progress towards collectable
  const { user } = useAuth(); // current user

  // open planet drawer
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editingName, setEditingName] = useState(false);
  //when 100% = percetn
  const [collectable, setCollectable] = useState(false);

  const [drops, setDrops] = useState([]);

  // collectable modal
  const [openCollectModal, setOpenCollectModal] = useState(false);
  const handleOpenModal = () => setOpenCollectModal(true);
  const handleCloseModal = () => {
    setOpenCollectModal(false);
    location.reload();
  };
  const [collectableObj, setCollectableObj] = useState(null);

  const common = { height: "200px", width: "200px" };
  const uncommon = { height: "200px", width: "200px", background: "#1e853a" };
  const rare = { height: "200px", width: "200px", background: "#cc7f02" };

  function checkElapsed() {
    let created_at = new Date();

    if (sim["last_roll"]) {
      created_at = Date.parse(sim["last_roll"]);
    } else {
      created_at = Date.parse(sim["created_at"]);
    }

    let now = new Date();

    let dif = now - created_at;

    let difMins = Math.floor(dif / 60000);

    if (Math.floor((difMins / sim["sim_type"]["gestation"]) * 100) >= 100) {
      setCollectable(true);
      setPercent(Math.floor(100));
    } else {
      setPercent(Math.floor((difMins / sim["sim_type"]["gestation"]) * 100));
    }
    console.log("re-did math... your welcome");
    setTimeout(checkElapsed, 10000);
  }

  async function getDrops() {
    let { data: possibleDrops, error } = await supabaseClient
      .from("items")
      .select("*")
      .filter("planets", "cs", `{"${sim["sim_type"]["id"]}"}`)
      .order("rarity", { ascending: true });

    setDrops(possibleDrops);
  }

  useEffect(() => {
    checkElapsed();
    getDrops();
  }, []);

  async function handleUpdate() {
    const { data, error } = await supabase
      .from("simulations")
      .update({ name: "otherValue" })
      .eq("some_column", "someValue")
      .select();
  }

  async function handleDelete() {
    const { error } = await supabase
      .from("simulations")
      .delete()
      .eq("id", "someValue");
  }

  const invokeFunction = async () => {
    let created_at = new Date();
    setCollectable(false);

    if (sim["last_roll"]) {
      created_at = Date.parse(sim["last_roll"]);
    } else {
      created_at = Date.parse(sim["created_at"]);
    }

    let now = new Date();

    let dif = now - created_at;

    let difMins = Math.floor(dif / 60000);

    if (Math.floor((difMins / sim["sim_type"]["gestation"]) * 100) >= 100) {
      setCollectable(true);
      setPercent(100);
      const { data: obj, error } = await supabaseClient.functions.invoke(
        "roll-for-item",
        {
          body: {
            planet_id: `${sim["id"]}`,
            user_id: user.id,
          },
        }
      );

      setCollectableObj(obj);
      handleOpenModal();
      console.log(collectableObj);
    } else {
      setPercent(Math.floor((difMins / sim["sim_type"]["gestation"]) * 100));
      handleOpen();
      setCollectable(false);
      // alert('No Resources to Collect!')
    }
  };

  const status = percent === 100 ? "success" : null;
  const color = percent === 100 ? "#52c41a" : "#3385ff";

  return (
    <>
      <div className="flex flex-nowrap w-full w-full hover:drop-shadow-[0_4px_12px_rgba(255,235,205,.5)] hover:bg-slate-800 transition-all duration-700">
        <img
          className="inline-block"
          onClick={handleOpen}
          height="100px"
          width="100px"
          src={sim["sim_type"]["world_image"]}
        />
        <div
          onClick={handleOpen}
          className="inline-block my-auto w-[30%] max-w-[800px] no-wrap overflow-hidden pr-[80px]"
        >
          <h4>{sim["name"] + ".plnt"}</h4>
          <p style={{ fontSize: 10, color: "#636363" }}>{sim["uniq"]}</p>
        </div>
        {collectable && (
          <div className="my-auto" onClick={invokeFunction}>
            <Button title="COLLECT" />
          </div>
        )}
        {!collectable && (
          <div className="my-auto" onClick={invokeFunction}>
            <Button title={{ percent } + "%"} />
          </div>
        )}
      </div>

      <Drawer backdrop={"true"} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>
            {!editingName ? (
              <>
                {sim["name"]} <MdEdit onClick={setEditingName} />
              </>
            ) : (
              <>
                <Stack gap={10}>
                  <Input
                    placeholder="Simulator Name"
                    style={{ width: "300px" }}
                    value={sim["name"]}
                  />
                  <Button onClick={setEditingName}>SAVE</Button>
                </Stack>
              </>
            )}
          </Drawer.Title>

          <Drawer.Actions></Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <>
            <div
              style={{ backgroundColor: "#2a2357", justifyContent: "center" }}
            >
              <img
                height="200px"
                width="200px"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                src={sim["sim_type"]["world_image"]}
              />
            </div>
            <Progress.Line
              percent={percent}
              strokeColor={color}
              status={status}
            />
            <h4>Description:</h4>
            <p>{sim["sim_type"]["description"]}</p>
            <h4>DROPS: {sim["sim_type"]["gestation"]}mins</h4>
            <Stack wrap spacing={6}>
              {drops?.map((item) => (
                <ItemDropCard item={item} />
              ))}
              {/* <p>{simTypes && sim[2]['description']}</p> */}
            </Stack>
            {/* <p>{simTypes && sim[2]['description']}</p> */}
            <hr />
          </>
          <Button appearance="primary" color="red" block>
            Delete
          </Button>
          <hr />
        </Drawer.Body>
      </Drawer>

      <Modal open={openCollectModal}>
        <h4>You got a new collectable!</h4>
        {collectableObj ? (
          <>
            {collectableObj["already_exists"] && <h4>NEW ITEM!</h4>}
            <div className="px-auto">
              <FlippableCard item={collectableObj} />
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            {/* <Loader size="lg" /> */}
          </div>
        )}
        <div>
          <Button
            title={"close"}
            onClick={handleCloseModal}
            appearance="primary"
          />
          <Button
            title={"Go To Inventory"}
            onClick={handleCloseModal}
            appearance="subtle"
          />
        </div>
      </Modal>
    </>
  );
}

export default SimulationListItem;
