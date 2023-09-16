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
  Input,
  Loader,
  InputGroup,
} from "rsuite";
import SelectAvatar from "../../Components/SelectAvatar";
import { NavLink } from "react-router-dom";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [avitar, setAvitar] = useState(null);
  const [bg, setBg] = useState(null);
  const [bio, setBio] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    async function getProfile() {
      setLoading(true);

      let { data, error } = await supabase
        .from("profiles")
        .select(`username, email, bio, bg, ethercoin, avatars(path, id)`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUserInfo(data);
        setUsername(data["username"]);
        setAvitar(data["avatars"]["id"]);
        setBg(data["bg"]);
        setBio(data["bio"]);
        console.log(data);
      }
      setLoading(false);
    }

    getProfile();
  }, [user]);

  async function updateProfile() {
    setLoading(true);

    const updates = {
      id: user.id,
      avitar: avitar,
      username: username,
      bg: bg,
      bio: bio,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      {!loading && userInfo ? (
        <>
          <Form className="form-widget">
            <h4>人{userInfo["username"]}</h4>
            {userInfo ? (
              <div
                style={{
                  backgroundColor: `#${userInfo["bg"]}`,
                  width: 200,
                }}
              >
                <img
                  src={userInfo["avatars"]["path"]}
                  style={{ width: "100%" }}
                />
              </div>
            ) : (
              <Panel
                height="200px"
                width="200px"
                shaded
                bordered
                bodyFill
                style={{
                  display: "inline-block",
                  minWidth: 200,
                  minHeight: 200,
                }}
              ></Panel>
            )}
            <ButtonToolbar>
              <ButtonGroup>
                <Button>Edit Avatar</Button>
                <SelectAvatar />
              </ButtonGroup>
            </ButtonToolbar>
            <br />

            <label>Username:</label>
            <InputGroup>
              <InputGroup.Addon> 人</InputGroup.Addon>
              <Input value={userInfo["username"]} placeholder="Username" />
            </InputGroup>
            <br />

            <label>Email:</label>
            <Input placeholder="Email" value={userInfo["email"]} disabled />
            <br />

            <label>Avatar:</label>
            <Input placeholder="Avatar" value={userInfo["avatars"]["id"]} />
            <br />

            <label>Avatar Background:</label>
            <InputGroup>
              <InputGroup.Addon> #</InputGroup.Addon>
              <Input placeholder="Avatar" value={userInfo["bg"]} />
            </InputGroup>
            <br />

            <label>Avatar Border:</label>
            <Input placeholder="Avatar Border" disabled />
            <br />

            <label>Bio:</label>
            <Input
              as="textarea"
              rows={3}
              placeholder="Tell The verse about yourself"
              value={userInfo["bio"]}
            />
            <br />
            <Button onClick={updateProfile}> Update </Button>
          </Form>
          <hr />
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
      ) : (
        <div>
          <Loader size="md" center content="loading" />
        </div>
      )}
    </>
  );
}

export default Profile;
