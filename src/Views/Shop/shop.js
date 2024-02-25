import { useState } from "react";
import SifiCard from "../../Components/SifiCard";

function Shop() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  return (
    <>
      <SifiCard title={"SHOP"} style={{ overflow: "auto" }}>
        <p></p>
      </SifiCard>
    </>
  );
}

export default Shop;
