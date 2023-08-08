import { useState, useEffect } from "react";
import AvatarUpload from "../../Components/AvatarUpload";
import { useAuth } from "../../hooks/Auth";
import { supabaseClient as supabase } from "../../config/supabase-client";
import {
  Avatar,
  Button,
  Form,
  Panel,
  PanelGroup,
  Divider,
  List,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
} from "rsuite";
import SelectAvatar from "../../Components/SelectAvatar";
import { NavLink } from "react-router-dom";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bgColor, setBgColor] = useState("1a2d8a");
  const [ethercoin, setEthercoin] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    async function getProfile() {
      setLoading(true);

      let { data, error } = await supabase
        .from("profiles")
        .select(`username,bg, ethercoin, avatars(path)`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        //! TITLE
        //! SHOWCASE ITEMS
        //! SHOWCASE BADGES
        setUsername(data.username);
        setAvatarUrl(data.avatars.path);
        setEthercoin(data.ethercoin);
        setBgColor(data.bg);
        console.log(data);
      }

      setLoading(false);
    }

    getProfile();
  }, [user]);

  async function updateProfile(event) {
    event.preventDefault();
    setLoading(true);

    const updates = {
      id: user.id,
      username,
      website,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  const data = [
    {
      label: "Username",
      value: "john_doe",
    },
    {
      label: "Email",
      value: "john.doe@example.com",
    },
    {
      label: "Location",
      value: "New York, USA",
    },
    // Add more data as needed
  ];

  return (
    <>
      <Form onSubmit={updateProfile} className="form-widget">
        <h4>人{username}</h4>
        {avatarUrl ? (
          <div style={{ backgroundColor: `#${bgColor}`, width: 200 }}>
            <img src={avatarUrl} style={{ width: "100%" }} />
          </div>
        ) : (
          <Panel
            height="200px"
            width="200px"
            shaded
            bordered
            bodyFill
            style={{ display: "inline-block", minWidth: 200, minHeight: 200 }}
          ></Panel>
        )}
        <h5>{ethercoin} eC</h5>
        <ButtonToolbar>
          <ButtonGroup>
            <Button
              to={"/inventory"}
              as={NavLink}
              className="button block"
              type="button"
            >
              Inventory
            </Button>
            <Button
              to={"/simulator"}
              as={NavLink}
              className="button block"
              type="button"
            >
              Simulator
            </Button>
            <Button
              to={"/challenges"}
              as={NavLink}
              className="button block"
              type="button"
            >
              Challenges
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button>Edit Profile</Button>
            <Button>Edit Avatar</Button>
            <SelectAvatar />
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar></ButtonToolbar>
      </Form>
      <div>
        <Button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default Profile;
