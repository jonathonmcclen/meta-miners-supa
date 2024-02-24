import { Link } from "react-router-dom";
import Button from "../Button";
import NavItem from "../NavItem";

function Header1() {
  return (
    <>
      <div className="bg-[#000] h-[80px] tracking-widest">
        <div className="ml-[20px]">
          <div className="inline-block px-[20px] h-[80px] text-[#FFD1B2] items-center">
            <Link to="/">
              <p className="mt-[30px]  text-4xl font-thin">SIMULATION MINERS</p>
            </Link>
          </div>
          <NavItem title="HOME" link="/" />
          <NavItem title="ABOUT" link="/about" />
          <NavItem title="RELEASE NOTES" link="/release-notes" />
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
