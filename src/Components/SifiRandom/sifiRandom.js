import { Children, useEffect, useState } from "react";
import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";

function SifiRandom({
  length,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  delay = 1000,
}) {
  const [string, setString] = useState(makeid(4));

  function makeid(length) {
    let result = "";
    const characters = chars;
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function updateString() {
    setString(makeid(length));
  }

  useEffect(() => {
    setString(makeid(length));
    setInterval(updateString, delay);
  }, []);

  return (
    <>
      <div>{string}</div>
    </>
  );
}

export default SifiRandom;
