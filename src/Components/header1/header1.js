import { Link } from "react-router-dom";
import Button from "../Button";

function Header1() {
  return (
    <>
      <div className="bg-[#000] h-[80px] tracking-widest">
        <div className="ml-[20px]">
          <div className="inline-block px-[20px] h-[80px] text-[#22FC37] items-center">
            <p className="mt-[30px]  text-4xl font-thin">SIMULATION MINERS</p>
          </div>
          <Link to="/">
            <div className="inline-block px-[20px] h-[80px] hover:text-[#22FC37] items-center hover:underline underline-offset-8">
              <p className="mt-[30px] ">HOME</p>
            </div>
          </Link>
          <Link to="/about">
            <div className="inline-block px-[20px] h-[80px] hover:text-[#22FC37] items-center hover:underline underline-offset-8">
              <p className="mt-[30px]">ABOUT</p>
            </div>
          </Link>
          <Link to="/release-notes">
            <div className="inline-block px-[20px] h-[80px] hover:text-[#22FC37] items-center hover:underline underline-offset-8">
              <p className="mt-[30px]">RELEASE NOTES</p>
            </div>
          </Link>
          <Link to="/login">
            <div className="inline-block px-[20px] h-[80px] ">
              <Button title={"LOGIN / REGISTER"} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header1;
