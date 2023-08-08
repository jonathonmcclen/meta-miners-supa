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
      <div style={styles.container}>
        {/* Search bar */}
        <Input
          // onChange={(e) => {
          //   updateSearchTerm(e.target.value);
          // }}
          style={styles.input}
          placeholder="Search..."
          // Add necessary search bar props and event handlers here
        />

        {/* Filter dropdown */}
        <Dropdown style={styles.dropdown} title="Sort">
          <Dropdown.Item>Alphabetical</Dropdown.Item>
          <Dropdown.Item>Rarity</Dropdown.Item>
          <Dropdown.Item>Simulation Type</Dropdown.Item>
          <Dropdown.Item>Most Recent</Dropdown.Item>
          <Dropdown.Item>Amount</Dropdown.Item>
        </Dropdown>

        {/* Progress bar */}
        <Button appearance="primary"> + Post</Button>
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

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%", // Adjust the width as needed
    margin: "10px",
  },
  input: {
    width: "30%", // Adjust the width as needed
  },
  dropdown: {
    width: "10%", // Adjust the width as needed
  },
  progressBar: {
    width: "60%", // Adjust the width as needed
  },
};

export default BlackMarket;
