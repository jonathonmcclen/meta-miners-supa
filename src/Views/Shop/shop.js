import { useState } from "react";
import SifiCard from "../../Components/SifiCard";

function Shop() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  return (
    <>
      <SifiCard title={"About Simulation Miners"} style={{ overflow: "auto" }}>
        <p>
          First, welcome miner! I know your itching to get started mining,
          simulating fantastical worlds and mining them for collectible
          resources. META MINERS is a idle mining platform. Feel free to go
          about your business while your set up simulators produce resources
          every 20-30 minutes. as you colect items/resources you can choose to
          sell them for eC {"("} eatherCoin {")"}. eC be used to buy resources
          from other MINERS as well as purchase more simulation types for a
          chance of higher rarity drops. The choice is yours!
        </p>
      </SifiCard>
    </>
  );
}

export default Shop;
