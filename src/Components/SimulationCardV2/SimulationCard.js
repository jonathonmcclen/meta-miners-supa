import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Col,
  Drawer,
  Input,
  Loader,
  Modal,
  Panel,
  Placeholder,
  Progress,
  Row,
  Stack,
  Tag,
} from "rsuite";
import { supabaseClient } from "../../config/supabase-client";
import { useAuth } from "../../hooks/Auth";
import ItemDropCard from "../ItemDropCard";
import { MdEdit } from "react-icons/md";
import FlippableCard from "../FlippableCard";
import { FaUsers } from "react-icons/fa";
import { GiMedicalPackAlt, GiBurstBlob } from "react-icons/gi";
import "./simulation-card.css";

function SimulationCard({ sim }) {
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

  // useEffect(() =>{

  //     simTypes.map(item => {
  //       if (item.value == value){
  //         setSelected(item)
  //       }
  //       console.log(selected)
  //     })

  //     async function getDrops() {
  //       let { data: possibleDrops, error } = await supabaseClient
  //         .from('items')
  //         .select('*')
  //         .filter('planets', 'cs', `{"${selected['value']}"}`)
  //         .order('rarity', { ascending: true })

  //       setDrops(possibleDrops)
  //     }

  //     getDrops()
  //     console.log(drops)

  //   }, [value])

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

  //   const invokeFunction = async () => {
  //     const { data, error } = await supabaseClient.functions.invoke('hello-world', {
  //         body: {
  //             planet_id: sim['id'],
  //             user_id: user.id
  //         }
  //     }
  //     )
  // }

  const status = percent === 100 ? "success" : null;
  const color = percent === 100 ? "#52c41a" : "#3385ff";

  return (
    <>
      <Panel
        className="planet w-full h-96"
        bordered
        style={{
          alignContent: "center",
          position: "relative",
          padding: "-100px",
        }}
      >
        <h4>{sim["name"]}</h4>
        <p style={{ fontSize: 10, color: "#636363" }}>{sim["uniq"]}</p>
        <img
          onClick={handleOpen}
          height="200px"
          width="200px"
          src={sim["sim_type"]["world_image"]}
        />
        <div
          style={{
            width: 80,
            display: "inline-block",
            position: "absolute",
            marginRight: 10,
            left: 10,
            top: 100,
          }}
        >
          <p>
            <GiBurstBlob /> &#60;&#105;&#62;&#94; 100/100
          </p>
          <p>
            <FaUsers /> 1.6K
          </p>
          <p>
            <GiMedicalPackAlt /> 100%
          </p>
        </div>
        <div
          style={{
            width: 45,
            display: "inline-block",
            position: "absolute",
            marginRight: 10,
            left: 188,
            top: 100,
          }}
        >
          <Progress.Circle
            percent={percent}
            strokeColor={color}
            status={status}
          />
        </div>
        {collectable && (
          <Button
            onClick={invokeFunction}
            block
            className="w-full h-96"
            style={{
              backgroundColor: "rgba(63, 231, 49, 0.10)",
              color: "rgba(63, 231, 49, 1)",
              textDecoration: "underline",
              textDecorationColor: "rgba(255,255,255,1)",
              textUnderlineOffset: "9px",
              backdropFilter: "blur(3px)",
              letterSpacing: "5px",
              fontWeight: "3px",
              textTransform: "uppercase",
              display: "inline-block",
              position: "absolute",
              marginRight: 10,
              left: 0,
              top: 0,
            }}
          >
            Collect
          </Button>
        )}
        {/* <Tag color="blue">{sim["sim_type"]["name"]}</Tag> */}
      </Panel>

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

      <Modal
        backdrop={"static"}
        keyboard={false}
        open={openCollectModal}
        onClose={handleCloseModal}
      >
        <Modal.Header>
          <Modal.Title>
            <h4>You got a new collectable!</h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            alignContent: "center",
            textAlign: "center",
            padding: "20px 125px",
          }}
        >
          {collectableObj ? (
            <>
              {collectableObj["already_exists"] && <h4>NEW ITEM!</h4>}

              <FlippableCard item={collectableObj} />
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Loader size="lg" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} appearance="primary">
            close
          </Button>
          <Button onClick={handleCloseModal} appearance="subtle">
            Go To Inventory
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const styles = {
  container: {
    display: "inline-block",
  },
  slot: {
    width: "100px",
    height: "100px",
    border: "2px solid #8c8c8c",
    borderRadius: "4px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    background: "#1D202D",
    boxShadow: "2px 2px 1px 0px #000 inset",
  },
  item: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  count: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    background: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "14px",
  },
};

export default SimulationCard;
