import { useEffect, useState } from "react";
import "./flippable-card.css";
import { CSSTransition } from "react-transition-group";
import { Panel, Tag } from "rsuite";

function FlippableCard({
  item = { item: { rarity: 3, path: "  ", name: "Test Item" } },
}) {
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    var playBtn = document.getElementById("front-of-card");
    let build = document.getElementById("build");
    let collect = document.getElementById("collect");
    build.volume = 0.1;

    playBtn.addEventListener(
      "mouseover",
      function () {
        // do whatever
        build.volume = 0.8;

        build.play();
      },
      false
    );

    playBtn.addEventListener(
      "click",
      function () {
        // build.pause();
        collect.play();
      },
      false
    );

    playBtn.addEventListener(
      "mouseleave",
      function () {
        // build.pause();
        build.volume = 0.1;
        build.currentTime = 0;
      },
      false
    );
  }, []);

  return (
    <>
      <audio
        id="build"
        src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/sounds/Space.wav"
        preload="auto"
        loop
        autoPlay
      ></audio>

      <audio
        id="collect"
        src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/sounds/Collect.wav?t=2023-07-31T19%3A43%3A50.658Z"
        preload="auto"
      ></audio>

      <div className="flippable-card-container">
        <CSSTransition in={clicked} timeout={300} classNames="flip">
          <div className="card">
            <div id="back" className="card-back">
              <h3>
                {item["item"]["name"]}{" "}
                {item["item"]["rarity"] == 1 && <Tag size="lg">Common</Tag>}
                {item["item"]["rarity"] == 2 && (
                  <Tag size="lg" color="green">
                    uncommon
                  </Tag>
                )}
                {item["item"]["rarity"] == 3 && (
                  <Tag size="lg" color="orange">
                    Rare
                  </Tag>
                )}
              </h3>
              <hr />
              <div style={styles.container}>
                {item["item"]["rarity"] == 1 && (
                  <div style={styles.container}>
                    <div
                      style={{
                        ...styles.slot,
                        padding: "10px",
                        width: 190,
                        height: 190,
                      }}
                    >
                      <img style={styles.item} src={item["item"]["path"]} />
                    </div>
                  </div>
                )}

                {item["item"]["rarity"] == 2 && (
                  <div style={styles.container}>
                    <div
                      style={{
                        ...styles.slot,
                        padding: "10px",
                        border: "2px solid #1e853a",
                        width: 190,
                        height: 190,
                      }}
                    >
                      <img style={styles.item} src={item["item"]["path"]} />
                    </div>
                  </div>
                )}

                {item["item"]["rarity"] == 3 && (
                  <div style={styles.container}>
                    <div
                      style={{
                        ...styles.slot,
                        padding: "10px",
                        border: "2px solid #cc7f02",
                        width: 190,
                        height: 190,
                      }}
                    >
                      <img style={styles.item} src={item["item"]["path"]} />
                    </div>
                  </div>
                )}

                {/* Description and information */}
                {item["item"]["description"]}
              </div>
            </div>
            <div
              id="front-of-card"
              onClick={() => {
                setClicked(false);
              }}
              className="card-front"
            ></div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "inline-block",
  },
  slot: {
    width: "100px",
    height: "100px",
    border: "2px solid #8c8c8c",
    borderRadius: "4px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    background: "#1D202D",
    boxShadow: "2px 2px 1px 0px #000 inset",
  },
  item: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  count: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    background: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "14px",
  },
};

export default FlippableCard;
