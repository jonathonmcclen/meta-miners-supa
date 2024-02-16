import { Children, useEffect, useState } from "react";
import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";
// import "./SifiCard.css";

function SifiCard2({
  children,
  title,
  header = true,
  subHeader,
  number,
  body,
}) {
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <>
      <div className="sifi-border">
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="card-body">
          {header && (
            <div className="sifi-header">
              <h2>{title ? title : makeid(4)}</h2>
              <p>{subHeader ? subHeader : makeid(25)}</p>
            </div>
          )}
          <div className="sifi-body">{children}</div>
        </div>
        <div className="bot-left-corner"></div>
        <div className="bot-right-corner"></div>
      </div>
    </>
  );
}

export default SifiCard2;
