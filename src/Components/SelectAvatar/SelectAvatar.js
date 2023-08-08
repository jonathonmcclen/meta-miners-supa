import { useEffect, useState } from "react";
import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";
function SelectAvatar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [avatars, setAvatars] = useState();

  useEffect(() => {
    const getAvatars = async function () {
      let { data, error } = await supabase.from("avatars").select(`*`);

      setAvatars(data);
      console.log(data);
    };

    getAvatars();
  }, []);

  async function handleSave() {}

  async function handleCancel() {}

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen}>Edit Avatar</Button>
      </ButtonToolbar>

      <Modal overflow={true} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {avatars?.map((avatar) => (
            <img src={avatar["path"]} width="50px" />
          ))}
          {/* <Placeholder.Paragraph rows={80} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            save
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SelectAvatar;
