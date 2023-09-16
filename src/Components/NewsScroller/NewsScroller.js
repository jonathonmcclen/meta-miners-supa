import Marquee from "react-fast-marquee";
import ScrollItem from "./ScrollItem";

function NewsScroller() {
  return (
    <Marquee speed={25} style={{ height: "30px" }} pauseOnHover>
      <ScrollItem
        inner={"Check out our other games at <a>escRoomGames.com</a>!"}
      />
      <ScrollItem inner={"Woohoo! Quake Con!"} />
      <ScrollItem
        inner={"Sell your junk and buy better simulators like the SiFi world"}
      />
      <ScrollItem inner={"Welcome Miners"} />
      <ScrollItem
        inner={"Check out the challenges tab to see your progression"}
      />
      <ScrollItem inner={"All Simulators are set to X2 Speed for Quake con!"} />
      <ScrollItem
        inner={"Support indie developers by donating on <a>paypal</a>"}
      />{" "}
      <ScrollItem
        inner={"Support indie developers by donating on <a>paypal</a>"}
      />
    </Marquee>
  );
}

export default NewsScroller;
