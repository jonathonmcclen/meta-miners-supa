import { Avatar, AvatarGroup, Button, Modal, Stack } from "rsuite";
import UserIcon from "@rsuite/icons/legacy/User";
import { useState } from "react";
import "./item-drop-card.css";

function ItemDropCard({ item, outline = false }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newSimModalOpen, setNewSimModalOpen] = useState(false);

  // const handleAddSim = async function() {
  //     const { data, error } = await supabase
  //     .from('simulations')
  //     .insert([
  //         { some_column: 'someValue', other_column: 'otherValue' },
  //     ])
  //     .select()
  // }

  function handleModal() {
    setNewSimModalOpen(true);
  }

  const common = { height: "50px", width: "50px" };
  const uncommon = { height: "50px", width: "50px", background: "#1e853a" };
  const rare = { height: "50px", width: "50px", background: "#cc7f02" };

  return (
    <>
      {item["rarity"] == 1 && (
        <div onClick={handleOpen} style={styles.container}>
          <div style={{ ...styles.slot, padding: "10px" }} bordered>
            {outline ? (
              <img
                id={"item-" + item["id"]}
                className="outlined"
                style={styles.item}
                src={item["path"]}
              />
            ) : (
              <img style={styles.item} src={item["path"]} />
            )}
          </div>
        </div>
      )}

      {item["rarity"] == 2 && (
        <div onClick={handleOpen} style={styles.container}>
          <div
            style={{
              ...styles.slot,
              padding: "10px",
              border: "1px solid #1e853a",
            }}
            bordered
          >
            {outline ? (
              <img
                id={"item-" + item["id"]}
                className="outlined"
                style={styles.item}
                src={item["path"]}
              />
            ) : (
              <img style={styles.item} src={item["path"]} />
            )}
          </div>
        </div>
      )}

      {item["rarity"] == 3 && (
        <div onClick={handleOpen} style={styles.container}>
          <div
            style={{
              ...styles.slot,
              padding: "10px",
              border: "1px solid #cc7f02",
            }}
            bordered
          >
            {outline ? (
              <img
                id={"item-" + item["id"]}
                className="outlined"
                style={styles.item}
                src={item["path"]}
              />
            ) : (
              <img style={styles.item} src={item["path"]} />
            )}
          </div>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {item["name"]} {"(x"}
            {item["count"]}
            {")"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack spacing={6}>
            <Avatar
              onClick={handleOpen}
              style={{ height: "200px", width: "200px" }}
            >
              <img height="100%" src={item["path"]} />
            </Avatar>
            <p>{item["description"]}</p>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const styles = {
  container: {
    display: "inline-block",
  },
  slot: {
    width: "50px",
    height: "50px",
    border: "1px solid #8c8c8c",
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

export default ItemDropCard;
