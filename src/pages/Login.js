import { useEffect, useState } from "react";
import {
  Container,
  Content,
  Form,
  ButtonToolbar,
  Panel,
  FlexboxGrid,
  Loader,
  IconButton,
} from "rsuite";
import { supabaseClient } from "../config/supabase-client";
import { Session } from "@supabase/supabase-js";
import OffRoundIcon from "@rsuite/icons/OffRound";
import { useNavigate } from "react-router-dom";
import SifiCard from "../Components/SifiCard";
import Button from "../Components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const Login = async () => {
    setLoading(true);
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/");
    } catch (err) {
      throw err;
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  const Logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  };

  if (loading) return <Loader center content="loading" />;

  return (
    <Container>
      <div className="absolute z-0 overflow-hidden h-[50vh]">
        <img src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/LoginPlanet.png" />
      </div>
      <div className="z-50 center mt-[150px] mx-[5px] md:mx-[50px] lg:mx-[200px] xl:mx-[500px]">
        {!session ? (
          <>
            {/* <SifiCard title={"LOGIN"}> */}
            <Form fluid>
              <Form.Group>
                <Form.ControlLabel>Username or email address</Form.ControlLabel>
                <input className="w-full h-[32px]" />
                <Form.Control name="name" onChange={(e) => setEmail(e)} />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  onChange={(e) => setPassword(e)}
                  name="password"
                  type="password"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group>
                <ButtonToolbar>
                  <div onClick={Login}>
                    <Button
                      title="Sign In"
                      appearance="primary"
                      onClick={Login}
                    >
                      Sign in
                    </Button>
                  </div>
                  <Button appearance="link">Forgot password?</Button>
                </ButtonToolbar>
              </Form.Group>
            </Form>
            {/* </SifiCard> */}
          </>
        ) : (
          <>
            <p>Welcome back {session.user.email}</p>
            <IconButton
              size="sm"
              onClick={Logout}
              appearance="primary"
              icon={<OffRoundIcon />}
            >
              Logout
            </IconButton>
          </>
        )}
      </div>
    </Container>
  );
}

export default Login;
