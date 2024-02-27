import SifiRandom from "../SifiRandom";

function Loader() {
  return (
    <>
      {" "}
      <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <SifiRandom length={1000} delay={1000} chars={"- "} />
        <SifiRandom length={1000} delay={1000} chars={"- "} />
        <SifiRandom length={1000} delay={1000} chars={" □"} />

        <SifiRandom length={100} chars={"_- "} delay={2000} />
      </div>
    </>
  );
}

export default Loader;
