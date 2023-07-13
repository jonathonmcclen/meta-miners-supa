import { Avatar, Button, Form, Panel, Placeholder, SelectPicker, Stack } from "rsuite";
import { useAuth } from "../../hooks/Auth";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../config/supabase-client";

function CreateSimForm(){
    const [loadingSimTypes, setLoadingSimTypes] = useState(false)

    const { user } = useAuth()
    const [simTypes, setSimTypes] = useState([])
    const [selected, setSelected] = useState(null)
    
    const [name, setName] = useState('')
    const [value, setValue] = useState([])

    useEffect(() => {
        async function getSimTypes() {
            setLoadingSimTypes(true) 
      
            let { data, error } = await supabaseClient
            .from('sim_types')
            .select('id, name, description, world_image')   
      
            if (error) {
              console.warn(error)
            } else if (data) {
              let format = data.map(
                item => ({ 
                  label: item.name,
                  value: item.id, 
                  description: item.description,
                  path: item.world_image,
                })
              )
              setSimTypes(format)
            }
            setLoadingSimTypes(false)
        }
        getSimTypes()
    }, []) 

    useEffect(() =>{
      simTypes.map(item => {
        if (item.value == value){
          setSelected(item)
        }
        console.log(selected)
      })
    }, [value])

    const handleCreateSim = async function() {
        const { data, error } = await supabaseClient
        .from('simulations')
        .insert([
            { 
              sim_type: value,
              name: name,
              user_id: user.id
            },
        ])
        .select()

        if (error){
          console.warn(error)
        } else {
          
        }
    }

    return(
    <>
    {selected ?
      <>
        <img height="200px" width="200px" src={selected["path"]} />
        <h4>Description:</h4>
        <p>{selected["description"]}</p>
        <h4>Drops</h4>
        <Stack wrap spacing={6}>
        <Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/>
        {/* <p>{simTypes && sim[2]['description']}</p> */}
        </Stack>
        {/* <p>{simTypes && sim[2]['description']}</p> */}
        <hr/>
      </>
      :
      <>
        <Panel height="200px" width="200px" shaded bordered bodyFill style={{ display: 'inline-block', minWidth: 200, minHeight: 200 }}></Panel>

        <h4>Description:</h4>
        <Placeholder.Paragraph style={{ marginTop: 5 }} />
        <h4>Drops</h4>
        <Stack wrap spacing={6}>
        <Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/><Avatar/>
        {/* <p>{simTypes && sim[2]['description']}</p> */}
        </Stack>
        <hr/>
      </>
    }
      <Form onSubmit={handleCreateSim} className="form-widget"> 
        <Form.Group>
          <Form.ControlLabel htmlFor="email">Simulation Type</Form.ControlLabel>
          <SelectPicker value={value} onChange={setValue} data={simTypes} searchable={false} style={{ width: "100%" }} placeholder="Select Simulation Type" renderMenuItem={(label, item,description) => {
          return (
          <div>
            <i className="rs-icon rs-icon-user" /> {label}
          </div>
          );
          }}
          />
          <small><p>* Different simulation types allow for different resources and collectables to be produced</p></small>
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel htmlFor="name">Name</Form.ControlLabel>
          <Form.Control onChange={setName} style={{ width: "285%" }} id="name" type="text" value={name}  />
          <small><p>* Name your new world whatever you like!</p></small> 

        </Form.Group>

        <div>
          <Button className="button block primary" type="submit" >
            Create
          </Button>
        </div>
      </Form>
    </>
    )
}

export default CreateSimForm;