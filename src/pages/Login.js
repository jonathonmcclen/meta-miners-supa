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
import Button1 from "../Components/Button1";

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

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

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
      {/* <div className="absolute z-0 overflow-hidden h-[90vh]">
        <img src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/LoginPlanet.png" />
      </div> */}
      <div className="z-50 center mt-[150px] mx-[50px] md:mx-[50px] lg:mx-[200px] xl:mx-[600px]">
        {!session ? (
          <>
            {/* <SifiCard title={"LOGIN"}> */}
            <Form fluid>
              <label>Email</label>
              <input
                className="w-full h-[32px] text-black"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label>Password</label>
              <input
                className="w-full h-[32px] text-black"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Form.Group>
                <ButtonToolbar>
                  <div onClick={Login}>
                    <Button1
                      title="Sign In"
                      appearance="primary"
                      onClick={Login}
                    >
                      Sign in
                    </Button1>
                  </div>
                  <Button1>Forgot password?</Button1>
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
