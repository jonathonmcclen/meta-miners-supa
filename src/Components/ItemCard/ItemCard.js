import {
  Avatar,
  AvatarGroup,
  Button,
  Container,
  Content,
  Modal,
  Panel,
  Sidebar,
  Stack,
  Tag,
} from "rsuite";
import UserIcon from "@rsuite/icons/legacy/User";
import { useState } from "react";
import { useAuth } from "../../hooks/Auth";
import { supabaseClient } from "../../config/supabase-client";
import ItemSlot from "../ItemSlot";

function ItemCard({ item }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = useAuth();

  const [newSimModalOpen, setNewSimModalOpen] = useState(false);

  // const handleAddSim = async function() {
  //     const { data, error } = await supabase
  //     .from('simulations')
  //     .insert([
  //         { some_column: 'someValue', other_column: 'otherValue' },
  //     ])
  //     .select()
  // }

  const sellItem = async () => {
    const { data: obj, error } = await supabaseClient.functions.invoke(
      "sell-item",
      {
        body: {
          item_id: `${item["id"]}`,
          user_id: user.id,
        },
      }
    );
    setTimeout(window.location.reload(true), 5000);
  };

  function handleModal() {
    setNewSimModalOpen(true);
  }

  const common = { height: "100px", width: "100px" };
  const uncommon = { height: "100px", width: "100px", background: "#1e853a" };
  const rare = { height: "100px", width: "100px", background: "#cc7f02" };

  const commonLg = { height: "200px", width: "200px" };
  const uncommonLg = { height: "200px", width: "200px", background: "#1e853a" };
  const rareLg = { height: "200px", width: "200px", background: "#cc7f02" };

  return (
    <>
      {item["items"]["rarity"] == 1 && (
        <div onClick={handleOpen} style={styles.container}>
          <div style={{ ...styles.slot, padding: "10px" }} bordered>
            {/* Render the item here (you can use an image or any other content) */}
            <img style={styles.item} src={item["items"]["path"]} />
            {/* <div style={styles.item}>{item}</div> */}
            {/* Display the item count in the bottom right corner */}
            <div style={styles.count}>{item["count"]}</div>
          </div>
        </div>
      )}

      {item["items"]["rarity"] == 2 && (
        <div onClick={handleOpen} style={styles.container}>
          <div
            style={{
              ...styles.slot,
              padding: "10px",
              border: "2px solid #1e853a",
            }}
            bordered
          >
            {/* Render the item here (you can use an image or any other content) */}
            <img style={styles.item} src={item["items"]["path"]} />
            {/* <div style={styles.item}>{item}</div> */}
            {/* Display the item count in the bottom right corner */}
            <div style={styles.count}>{item["count"]}</div>
          </div>
        </div>
      )}

      {item["items"]["rarity"] == 3 && (
        <div onClick={handleOpen} style={styles.container}>
          <div
            style={{
              ...styles.slot,
              padding: "10px",
              border: "2px solid #cc7f02",
            }}
            bordered
          >
            {/* Render the item here (you can use an image or any other content) */}
            <img style={styles.item} src={item["items"]["path"]} />
            {/* <div style={styles.item}>{item}</div> */}
            {/* Display the item count in the bottom right corner */}
            <div style={styles.count}>{item["count"]}</div>
          </div>
        </div>
      )}
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {item["items"]["name"]}
            {" " + " " + " " + " " + " "}

            {item["items"]["rarity"] == 1 && <Tag size="lg">Common</Tag>}

            {item["items"]["rarity"] == 2 && (
              <Tag size="lg" color="green">
                uncommon
              </Tag>
            )}

            {item["items"]["rarity"] == 3 && (
              <Tag size="lg" color="orange">
                Rare
              </Tag>
            )}
            {" " + " " + " "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Sidebar>
              {item["items"]["rarity"] == 1 && (
                <>
                  <div onClick={handleOpen} style={styles.container}>
                    <div
                      style={{
                        ...styles.slot,
                        padding: "10px",
                        width: 190,
                        height: 190,
                      }}
                      bordered
                    >
                      {/* Render the item here (you can use an image or any other content) */}
                      <img style={styles.item} src={item["items"]["path"]} />
                      {/* <div style={styles.item}>{item}</div> */}
                      {/* Display the item count in the bottom right corner */}
                      <div style={styles.count}>{item["count"]}</div>
                    </div>
                  </div>
                </>
              )}

              {item["items"]["rarity"] == 2 && (
                <div onClick={handleOpen} style={styles.container}>
                  <div
                    style={{
                      ...styles.slot,
                      padding: "10px",
                      border: "2px solid #1e853a",
                      width: 190,
                      height: 190,
                    }}
                    bordered
                  >
                    {/* Render the item here (you can use an image or any other content) */}
                    <img style={styles.item} src={item["items"]["path"]} />
                    {/* <div style={styles.item}>{item}</div> */}
                    {/* Display the item count in the bottom right corner */}
                    <div style={styles.count}>{item["count"]}</div>
                  </div>
                </div>
              )}

              {item["items"]["rarity"] == 3 && (
                <div onClick={handleOpen} style={styles.container}>
                  <div
                    style={{
                      ...styles.slot,
                      padding: "10px",
                      border: "2px solid #cc7f02",
                      width: 190,
                      height: 190,
                    }}
                    bordered
                  >
                    {/* Render the item here (you can use an image or any other content) */}
                    <img style={styles.item} src={item["items"]["path"]} />
                    {/* <div style={styles.item}>{item}</div> */}
                    {/* Display the item count in the bottom right corner */}
                    <div style={styles.count}>{item["count"]}</div>
                  </div>
                </div>
              )}
            </Sidebar>
            <Content>
              <p>{item["items"]["description"]}</p>
            </Content>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={sellItem} appearance="primary">
            Sell: {item["items"]["sell_price"]}
          </Button>
          <Button onClick={handleClose} appearance="warning">
            Delete
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

export default ItemCard;
