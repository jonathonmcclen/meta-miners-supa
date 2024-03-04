import { Link } from "react-router-dom";
import Button from "../Button";
import NavItem from "../NavItem";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

function Header1() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const handleHamOpen = () => setHamburgerOpen(true);
  const handleHamClose = () => setHamburgerOpen(false);
  return (
    <>
      <div className="bg-[#000] h-[80px] tracking-widest hidden md:block">
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

      <div className="bg-[#000] h-[80px] tracking-widest md:hidden">
        <div className="ml-[20px]">
          <div className="inline-block px-[20px] h-[80px] text-[#FFD1B2] items-center">
            <Link to="/">
              <p className="mt-[30px] text-3xl font-thin">SIMULATION MINERS</p>
            </Link>
          </div>
          <div
            onClick={handleHamOpen}
            className="absolute top-0 right-0 px-[20px] h-[80px] text-[#FFD1B2] items-center"
          >
            <RxHamburgerMenu
              className="mt-[30px]"
              style={{ fontSize: "30px" }}
            />
          </div>
        </div>
      </div>

      {/* ----------HAMBERGER MENUE---------- */}
      {hamburgerOpen && (
        <div className="fixed top-0 right-0 w-full h-[120vh] bg-black z-50 p-[40px]">
          <p
            className="text-3xl absolute top-0 right-0 mt-[35px] mr-[25px]"
            onClick={handleHamClose}
          >
            X
          </p>
          <div>
            <Link onClick={handleHamClose} to="/">
              HOME
            </Link>
          </div>
          <div>
            <Link onClick={handleHamClose} to="/about">
              ABOUT
            </Link>
          </div>
          <div>
            <Link onClick={handleHamClose} to="/release-notes">
              RELEASE NOTES
            </Link>
          </div>
          <Link onClick={handleHamClose} to="/login">
            <div className="w-full px-[30%] h-[80px] mx-auto text-center">
              <Button title={"LOGIN / REGISTER"} />
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default Header1;
