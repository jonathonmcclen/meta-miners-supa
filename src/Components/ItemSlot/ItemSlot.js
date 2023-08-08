import { Panel } from "rsuite";

function ItemSlot({ item, count }) {
  return (
    <div style={styles.container}>
      <Panel style={styles.slot} bordered>
        {item && <img height="100%" src={item["items"]["path"]} />}
        {/* Render the item here (you can use an image or any other content) */}
        <div style={styles.item}>{item}</div>
        {/* Display the item count in the bottom right corner */}
        <div style={styles.count}>{count}</div>
      </Panel>
    </div>
  );
}

const styles = {
  container: {
    display: "inline-block",
  },
  slot: {
    width: "100px",
    height: "100px",
    position: "relative",
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

export default ItemSlot;
