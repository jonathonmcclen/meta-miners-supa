import { useState } from "react";
import {
  Button,
  Drawer,
  Dropdown,
  Input,
  Panel,
  Placeholder,
  Progress,
  Stack,
} from "rsuite";
import FlippableCard from "../../Components/FlippableCard";

function BlackMarket() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  return (
    <>
      <div className="bg-black-500 grid grid-cols-2 px-7 py-2">
        <div className="grid-col w-full">
          {" "}
          <Input
            // onChange={(e) => {
            //   updateSearchTerm(e.target.value);
            // }}
            className="w-10"
            placeholder="Search..."
            // Add necessary search bar props and event handlers here
          />
        </div>
        <div className="grid-col w-full">
          <Button className="self-end mx-auto" appearance="primary">
            {" "}
            + Post
          </Button>
        </div>
      </div>
      <Stack
        direction="column"
        spacing={20}
        alignItems="center"
        style={{ marginTop: 30 }}
      >
        {/* Body */}
        <div style={{}}>
          <Panel
            style={{
              background: "#1D202D",
              borderRadius: "46px",
              maxWidth: "1800px",
              margin: "20px",
            }}
            header=""
            shaded
          >
            <h4>Getting Started</h4>
            <hr />
            <p>
              First, welcome miner! I know your itching to get started mining,
              simulating fantastical worlds and mining them for collectible
              resources. META MINERS is a idle mining platform. Feel free to go
              about your business while your set up simulators produce resources
              every 20-30 minutes. as you colect items/resources you can choose
              to sell them for eC {"("} eatherCoin {")"}. eC be used to buy
              resources from other MINERS as well as purchase more simulation
              types for a chance of higher rarity drops. The choice is yours!
            </p>
          </Panel>
        </div>
      </Stack>
      {/* POST CREATE */}
      <Drawer
        size={"lg"}
        backdrop={"true"}
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Create Post</Drawer.Title>

          <Drawer.Actions></Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Button appearance="primary" color="red" block>
            Create
          </Button>
        </Drawer.Body>
      </Drawer>

      {/* POST SHOW */}
      <Drawer
        size={"lg"}
        backdrop={"true"}
        open={openShow}
        onClose={() => setOpenShow(false)}
      >
        <Drawer.Header>
          <Drawer.Title>POST NAME</Drawer.Title>
          <Placeholder.Paragraph />
          <Drawer.Actions></Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Button appearance="primary" color="red" block>
            Comment
          </Button>
        </Drawer.Body>
      </Drawer>
    </>
  );
}

export default BlackMarket;
