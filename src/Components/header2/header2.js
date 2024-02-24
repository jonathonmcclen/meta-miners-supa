import { Link } from "react-router-dom";
import Button from "../Button";
import SifiRandom from "../SifiRandom";
import { useAuth } from "../../hooks/Auth";
import { useEffect, useState } from "react";
import NewsScroller from "../NewsScroller";
import { TbMoneybag } from "react-icons/tb";
import { supabaseClient as supabase } from "../../config/supabase-client";
import Avatar from "../Avatar";
import NavItem from "../NavItem";

function Header2() {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    if (user) {
      const getProfileInfo = async function () {
        let { data, error } = await supabase
          .from("profiles")
          .select(`username, ethercoin,bg , avatars(path)`)
          .eq("id", user.id)
          .single();

        //! FILTER 0's

        setCurrentUser(data);
        console.log(data);
      };

      getProfileInfo();
    }
  }, []);

  return (
    <>
      <NewsScroller />
      <div className="bg-[#000] noselect ">
        <div className="ml-[20px] tracking-widest">
          <div className=" inline-block px-[20px] h-[80px] text-[#22FC37] items-center">
            <Link to="/">
              <p className="mt-[30px]  text-4xl font-thin">SIMULATION MINERS</p>
            </Link>
          </div>
          <NavItem title="SIMULATOR" link="/simulator" />{" "}
          <NavItem title="SHOP" link="/shop" />
          <NavItem title="BLACK MARKET" link="/black-market" />
          <Link to="/profile">
            <div className="inline-block px-[20px] h-[80px] hover:text-[#22FC37] float-right">
              {currentUser && (
                <div className="mt-[30px]">
                  <Avatar
                    title={currentUser?.username}
                    subTitle={currentUser?.ethercoin.toLocaleString() + " eC"}
                    img={currentUser?.avatars.path}
                    bgColor={`#${currentUser["bg"]}`}
                  />
                </div>
              )}
            </div>
          </Link>
          <div
            onClick={handleSignOut}
            className="inline-block px-[20px] float-right h-[80px] items-center"
          >
            <div className="mt-[30px]">
              <Button title={"LOGOUT"} color="#ffc700" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header2;
