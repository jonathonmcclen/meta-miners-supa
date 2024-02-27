import bg from "./bg.png";
import "./dotbg.css";

function AnimatedBg() {
  return (
    <>
      <div
        style={{ zIndex: "-9" }}
        className="dot-blur absolute top-0 w-full left-0 h-full"
      ></div>
      <div style={{ zIndex: "-20" }} className=" absolute w-full left-0 m-auto">
        <img
          className="bg w-[80%] left-0 m-auto"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/geoBg.png?t=2024-02-27T04%3A32%3A13.890Z"
        />
      </div>
    </>
  );
}

export default AnimatedBg;
