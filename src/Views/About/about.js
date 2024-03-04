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

function About() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  return (
    <>
      <SifiCard title={"About Simulation Miners"} style={{ overflow: "auto" }}>
        <p className="text-3xl">About Idle Universe</p>
        <p>
          Welcome to Idle Universe, where the cosmos unfolds before your eyes in
          a captivating blend of exploration and relaxation. Created by
          programmer extraordinaire Jonathon McClendon, Idle Universe is the
          culmination of a vision to craft an engaging idle game that seamlessly
          integrates into your daily routine.
        </p>
        <p className="text-3xl">Discover the Universe:</p>
        <p>
          Embark on a cosmic journey spanning countless galaxies, each teeming
          with over 200 meticulously crafted collectible items. From ancient
          relics to futuristic marvels, every discovery brings you one step
          closer to unraveling the mysteries of the universe.
        </p>
        <p className="text-3xl">A Word from the Creator:</p>
        <p>
          As a programmer by day and avid gamer by night, Idle Universe
          represents more than just a project for me—it's a labor of love.
          Drawing from my own experiences, I set out to create a game that
          offers a perfect balance of entertainment and convenience, allowing
          players to dive into an immersive universe with minimal effort.
        </p>
        <p className="text-3xl">My Vision:</p>
        <p>
          With Idle Universe, my goal was simple: to provide players with a
          captivating idle gaming experience that resonates with their busy
          lifestyles. Whether you're commuting to work, taking a break between
          tasks, or simply unwinding at home, Idle Universe offers a sanctuary
          where you can escape into the cosmos and let your imagination soar.
        </p>
        <p className="text-3xl">Join the Adventure:</p>
        <p>
          Join me on this cosmic journey as we explore the vast reaches of Idle
          Universe together. Immerse yourself in a world of endless
          possibilities, where every discovery brings you closer to the heart of
          the universe.
        </p>
        <p>
          Experience Idle Universe today and discover the magic of a game that's
          more than just entertainment—it's a way of life.
        </p>
        [Subscribe Now] (CTA button)
        <p>
          Note: Idle Universe is a free-to-play game designed for mobile
          devices. Join our community today and embark on an adventure like no
          other.
        </p>
      </SifiCard>
    </>
  );
}

export default About;
