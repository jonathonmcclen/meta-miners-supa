import { Children, useEffect, useState } from "react";
import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";
import "./SifiCard.css";

function SifiCard({
  children,
  title,
  header = true,
  subHeader = <div></div>,
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

  useEffect(() => {
  const fadeIn = document.querySelectorAll('.fade-in');

  // for (let i = 0; i < fadeIn.length - 1; i++){
  //   fadeIn[i].classList.replace('opacity-0', 'opacity-100');
  //   fadeIn[i].classList.replace('scale-150', 'scale-100');
  // }
  // // Add the classes after the delay
    fadeIn.forEach(el => {
      el.classList.replace('opacity-0', 'opacity-100');
      el.classList.replace('scale-150', 'scale-100');

    });

  }, []);

  

  return (
    <>
      <div className="sifi-border">
        <div className="top-left-corner fade-in scale-150 opacity-0 delay-[800ms] transition-all duration-[1000ms]"></div>
        <div className="top-right-corner fade-in scale-150 opacity-0 delay-[1200ms] transition-all duration-[1800ms]"></div>
        <div className="card-body">
          {header && (
            <div className="sifi-header">
              <h2 className="text-3xl uppercase">
                {title ? title : makeid(4)}
              </h2>
              <p>{subHeader ? subHeader : makeid(25)}</p>
            </div>
          )}
          <div className="sifi-body">{children}</div>
        </div>
        <div className="bot-left-corner fade-in scale-150 opacity-0 delay-[1500ms] transition-all duration-[1600ms]"></div>
        <div className="bot-right-corner fade-in scale-150 opacity-0 delay-[1800ms] transition-all duration-[1200ms]"></div>
      </div>
    </>
  );
}

export default SifiCard;
