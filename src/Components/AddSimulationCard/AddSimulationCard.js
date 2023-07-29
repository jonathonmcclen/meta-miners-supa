import { useState } from "react"
import { Avatar, Panel, Modal, Button, ButtonToolbar, Placeholder, Drawer } from "rsuite"
import NewSimModal from "../NewSimModal"
import CreateSimForm from "../CreateSimForm";
import { BsLockFill } from 'react-icons/bs'


function AddSimulationCard({locked = false}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [newSimModalOpen, setNewSimModalOpen] = useState(false)
    
    // const handleAddSim = async function() {
    //     const { data, error } = await supabase
    //     .from('simulations')
    //     .insert([
    //         { some_column: 'someValue', other_column: 'otherValue' },
    //     ])
    //     .select()
    // }

    function handleModal(){
        setNewSimModalOpen(true)
    }

    return(
        <>

          <Panel onClick={!locked && handleOpen} style={{width: "250px", height: "360px", alignContent: "center"}} bordered>
              <Avatar style={{width: "210px", height: "320px", fontSize: 50}}>{!locked ? "+" : (<BsLockFill/>)}</Avatar>
          </Panel>

          <Drawer backdrop={"static"} open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
              <Drawer.Title>Create New Simulation</Drawer.Title>
              <Drawer.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)} appearance="primary">
                  Confirm
                </Button>
              </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
              <CreateSimForm/>
            </Drawer.Body>
          </Drawer>
      </>
    )
}

export default AddSimulationCard