import {
  Dropdown,
  Input,
  InputGroup,
  Loader,
  Panel,
  Progress,
  Stack,
} from "rsuite";
import ItemCard from "../../Components/ItemCard";
import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../../config/supabase-client";
import { useAuth } from "../../hooks/Auth";
import ItemSlot from "../../Components/ItemSlot";
import SearchIcon from "@rsuite/icons/Search";
import SifiCard from "../../Components/SifiCard";

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getInventroy() {
      setLoading(true);

      let { data, error } = await supabase
        .from("inventory")
        .select("*, items ( * )")
        .eq("user_id", user.id)
        // .order('created_at', { ascending: true })
        .order("rarity", { foreignTable: "items", ascending: true });

      if (error) {
        console.warn(error);
      } else if (data) {
        setItems(data);
      }

      setLoading(false);
    }
    console.log(items);
    getInventroy();
  }, []);

  // SEARCH
  function returnItems(itemArr, searchTerm) {
    const items =
      searchTerm && searchTerm.length > 0
        ? filterAccounts(itemArr, searchTerm)
        : itemArr;
    return items.sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
  }

  function filterAccounts(acctArr, searchTerm) {
    const term = searchTerm.toLowerCase();
    return acctArr.filter((account) => {
      return (
        account.username.toLowerCase().includes(term) ||
        account.tags.toLowerCase().includes(term)
      );
    });
  }

  // function updateSearchTerm(newVal) {
  //   startUpdating(() => {
  //     setSearchTerm(newVal);
  //   });
  // }

  return (
    <>
      {!loading ? (
        <>
          <Stack
            direction="column"
            spacing={20}
            alignItems="center"
            style={{ marginTop: 30 }}
          >
            <SifiCard title={"Inventory"}>
              <div style={styles.container}>
                {/* Search bar */}
                <Input
                  // onChange={(e) => {
                  //   updateSearchTerm(e.target.value);
                  // }}
                  style={styles.input}
                  placeholder="Search..."
                  // Add necessary search bar props and event handlers here
                />

                {/* Filter dropdown */}
                <Dropdown style={styles.dropdown} title="Sort">
                  <Dropdown.Item>Alphabetical</Dropdown.Item>
                  <Dropdown.Item>Rarity</Dropdown.Item>
                  <Dropdown.Item>Simulation Type</Dropdown.Item>
                  <Dropdown.Item>Most Recent</Dropdown.Item>
                  <Dropdown.Item>Amount</Dropdown.Item>
                </Dropdown>

                {/* Progress bar */}
                <Progress.Line
                  percent={50}
                  strokeColor="#007BFF"
                  style={styles.progressBar}
                />
              </div>

              <Panel>
                <div className="flex flex-wrap">
                  {searchTerm
                    ? returnItems(items, searchTerm).map((item, i) => (
                        <ItemCard item={item} />
                      ))
                    : items.map((item) => <ItemCard item={item} />)}
                </div>
              </Panel>
            </SifiCard>
          </Stack>
        </>
      ) : (
        <div>
          <Loader size="md" center content="loading" />
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%", // Adjust the width as needed
    margin: "10px",
  },
  input: {
    width: "30%", // Adjust the width as needed
  },
  dropdown: {
    width: "10%", // Adjust the width as needed
  },
  progressBar: {
    width: "60%", // Adjust the width as needed
  },
};

export default Inventory;
