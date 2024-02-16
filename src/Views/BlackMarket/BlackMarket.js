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
import SifiCard from "../../Components/SifiCard";
import SifiCard2 from "../../Components/SifiCard2";

function BlackMarket() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  return (
    <>
      <SifiCard />
      <div className="bg-black-500 grid grid-cols-2 px-7 py-2">
        <div className="grid-col w-full">
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
        <SifiCard style={{ overflow: "auto" }}>
          <SifiCard2 header={false}>
            <div style={{}}>
              <h4>Looking for materials</h4>
              <hr />
              <p>
                First, welcome miner! I know your itching to get started mining,
                simulating fantastical worlds and mining them for collectible
                resources. META MINERS is a idle mining platform. Feel free to
                go about your business while your set up simulators produce
                resources every 20-30 minutes. as you colect items/resources you
                can choose to sell them for eC {"("} eatherCoin {")"}. eC be
                used to buy resources from other MINERS as well as purchase more
                simulation types for a chance of higher rarity drops. The choice
                is yours!
              </p>
            </div>
          </SifiCard2>{" "}
          <SifiCard header={false}>
            <div style={{}}>
              <h4>Looking for materials</h4>
              <hr />
              <p>
                First, welcome miner! I know your itching to get started mining,
                simulating fantastical worlds and mining them for collectible
                resources. META MINERS is a idle mining platform. Feel free to
                go about your business while your set up simulators produce
                resources every 20-30 minutes. as you colect items/resources you
                can choose to sell them for eC {"("} eatherCoin {")"}. eC be
                used to buy resources from other MINERS as well as purchase more
                simulation types for a chance of higher rarity drops. The choice
                is yours!
              </p>
            </div>
          </SifiCard>{" "}
          <SifiCard header={false}>
            <div style={{}}>
              <h4>Looking for materials</h4>
              <hr />
              <p>
                First, welcome miner! I know your itching to get started mining,
                simulating fantastical worlds and mining them for collectible
                resources. META MINERS is a idle mining platform. Feel free to
                go about your business while your set up simulators produce
                resources every 20-30 minutes. as you colect items/resources you
                can choose to sell them for eC {"("} eatherCoin {")"}. eC be
                used to buy resources from other MINERS as well as purchase more
                simulation types for a chance of higher rarity drops. The choice
                is yours!
              </p>
            </div>
          </SifiCard>
          <SifiCard header={false}>
            <div style={{}}>
              <h4>Looking for materials</h4>
              <hr />
              <p>
                First, welcome miner! I know your itching to get started mining,
                simulating fantastical worlds and mining them for collectible
                resources. META MINERS is a idle mining platform. Feel free to
                go about your business while your set up simulators produce
                resources every 20-30 minutes. as you colect items/resources you
                can choose to sell them for eC {"("} eatherCoin {")"}. eC be
                used to buy resources from other MINERS as well as purchase more
                simulation types for a chance of higher rarity drops. The choice
                is yours!
              </p>
            </div>
          </SifiCard>
          <SifiCard header={false}>
            <div style={{}}>
              <h4>Looking for materials</h4>
              <hr />
              <p>
                First, welcome miner! I know your itching to get started mining,
                simulating fantastical worlds and mining them for collectible
                resources. META MINERS is a idle mining platform. Feel free to
                go about your business while your set up simulators produce
                resources every 20-30 minutes. as you colect items/resources you
                can choose to sell them for eC {"("} eatherCoin {")"}. eC be
                used to buy resources from other MINERS as well as purchase more
                simulation types for a chance of higher rarity drops. The choice
                is yours!
              </p>
            </div>
          </SifiCard>
        </SifiCard>
      </Stack>
    </>
  );
}

export default BlackMarket;
