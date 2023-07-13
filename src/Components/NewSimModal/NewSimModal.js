import { useState } from 'react';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';

function NewSimModal(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <>
        <ButtonToolbar>
          <Button onClick={handleOpen}> Open</Button>
        </ButtonToolbar>
  
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Placeholder.Paragraph />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  export default NewSimModal