import { useEffect, useState } from 'react';
import { Avatar, Button, ButtonGroup, Col, Drawer, Loader, Modal, Panel, Placeholder, Progress, Row, Stack } from 'rsuite';
import { supabaseClient } from '../../config/supabase-client';
import { useAuth } from '../../hooks/Auth';
import ItemDropCard from '../ItemDropCard';
function SimulationCard({sim}){
    const [percent, setPercent] = useState(0); //progress towards collectable
    const {user} = useAuth() // current user

    // open planet drawer
    const [open, setOpen] = useState(false); 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //when 100% = percetn
    const [collectable, setCollectable] = useState(false)

    const [drops, setDrops] = useState([])

    // collectable modal
    const [openCollectModal, setOpenCollectModal] = useState(false); 
    const handleOpenModal = () => setOpenCollectModal(true);
    const handleCloseModal = () => setOpenCollectModal(false);
    const [collectableObj, setCollectableObj] = useState(null)

    function checkElapsed(){
        let created_at = new Date

        if (sim['last_roll']){
            created_at =  Date.parse(sim['last_roll'])
        } else {
            created_at =  Date.parse(sim['created_at'])
        }
        
        let now = new Date()
        
        let dif = now - created_at

        let difMins = Math.floor((dif/60000))

        if (Math.floor((difMins/sim['sim_type']['gestation']) * 100 ) > 100){
            setCollectable(true)
            setPercent(100)
        } else {
            setPercent( Math.floor((difMins/sim['sim_type']['gestation']) * 100 ))
        }
        console.log('re-did math... your welcome')
        setTimeout(checkElapsed, 10000)
    }

    async function getDrops() {
        let { data: possibleDrops, error } = await supabaseClient
          .from('items')
          .select('*') 
          .filter('planets', 'cs', `{"${sim['sim_type']['id']}"}`)
          .order('rarity', { ascending: true })
 
        setDrops(possibleDrops)
      }

    useEffect(() =>{
        checkElapsed()
        getDrops()
    }, [])

    // useEffect(() =>{

    //     simTypes.map(item => {
    //       if (item.value == value){
    //         setSelected(item)
    //       }
    //       console.log(selected)
    //     })
  
    //     async function getDrops() {
    //       let { data: possibleDrops, error } = await supabaseClient
    //         .from('items')
    //         .select('*') 
    //         .filter('planets', 'cs', `{"${selected['value']}"}`)
    //         .order('rarity', { ascending: true })
   
    //       setDrops(possibleDrops)
    //     }
        
    //     getDrops()
    //     console.log(drops)
  
    //   }, [value])

    const invokeFunction = async () => {
        let created_at = new Date

        if (sim['last_roll']){
            created_at =  Date.parse(sim['last_roll'])
        } else {
            created_at =  Date.parse(sim['created_at'])
        }
        
        let now = new Date()
        
        let dif = now - created_at

        let difMins = Math.floor((dif/60000))

        if (Math.floor((difMins/sim['sim_type']['gestation']) * 100 ) > 100){
            setCollectable(true)
            setPercent(100)
            const { data: obj, error } = await supabaseClient.functions.invoke('roll-for-item', {
                body: {
                    planet_id: `${sim['id']}`,
                    user_id: user.id
                }
            })

            setCollectableObj(obj)
            handleOpenModal()
            console.log(collectableObj)

            // setTimeout(window.location.reload(), 5000) //! instead have it retunr iten and auto open modal to show new item + sound effect
        } else {
            setPercent( Math.floor((difMins/sim['sim_type']['gestation']) * 100 ))
            handleOpen()
            // alert('No Resources to Collect!')
            
        }


    }

    //   const invokeFunction = async () => {
    //     const { data, error } = await supabaseClient.functions.invoke('hello-world', {
    //         body: {
    //             planet_id: sim['id'],
    //             user_id: user.id
    //         }
    //     }
    //     )
    // }


    // const invokeFunction = async () => {
    //     fetch('https://nrpcmqkzpwyhpqnxkftn.supabase.co/functions/v1/roll-for-item', {
    //         method: 'POST',
    //         headers: {
    //             // 'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ycGNtcWt6cHd5aHBxbnhrZnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3ODEwODUsImV4cCI6MjAwNDM1NzA4NX0.2cENQpuc3wG0Z5lO7U5CCRFNV2NDtxFrI10tR1bXGVk'
    //         },
    //         body: JSON.stringify(
    //             {
    //                 "planet_id": sim['id'],
    //                 "user_id": "8275a7a6-5a5a-4893-b3f6-3f2580420750"
    //             }
    //         )
    //         })
    //         .then(response => response.json())
    //         .then(response => console.log(JSON.stringify(response)))
    // }

    

    const decline = () => {
        const value = Math.max(percent - 10, 0);
        setPercent(value);
    };

    const increase = () => {
        const value = Math.min(percent + 10, 100);
        setPercent(value);
    };

    const status = percent === 100 ? 'success' : null;
    const color = percent === 100 ? '#52c41a' : '#3385ff';

    return(
    <>
        <Panel  header={sim["name"]} style={{width: "250px", height: "390px", alignContent: "center"}}  bordered>
            <img onClick={handleOpen} height="200px" width="200px" src={sim["sim_type"]["world_image"]} />
            { !collectable ? 
            <Progress.Line percent={percent} strokeColor={color} status={status} />
            :
            <Button onClick={invokeFunction} block appearance="primary">Collect</Button>
}
            <p>{sim["uniq"]}</p>
            <p>{sim["sim_type"]["name"]}</p>
                {/* <ButtonGroup>
                    <Button onClick={decline}>-</Button>
                    <Button onClick={increase}>+</Button>
                </ButtonGroup> */}
                {/* <Row>
                    <Col md={6}>
                    <Progress.Line vertical percent={percent} strokeColor={color} status={status} />
                    </Col>
                    <Col md={6}>
                    <div style={{ width: 120, marginTop: 10 }}>
                        <Progress.Circle percent={percent} strokeColor={color} status={status} />
                    </div>
                    </Col>
                </Row> */}
            {/* <Placeholder.Paragraph /> */} 
        </Panel>

        <Drawer backdrop={"true"} open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
              <Drawer.Title>{sim["name"]}</Drawer.Title>
              <Drawer.Actions>
                <Button onClick={() => setOpen(false)}>Close</Button>
                <Button onClick={() => setOpen(false)} appearance="primary">
                  Edit
                </Button>
              </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                <>
                <div style={{backgroundColor: '#2a2357', justifyContent: 'center'}}>
                    <img height="200px" width="200px" style={{marginLeft: 'auto',marginRight: 'auto', display: 'block'}} src={sim["sim_type"]["world_image"]} />
                </div>
                    <Progress.Line percent={percent} strokeColor={color} status={status} />
                    <h4>Description:</h4>
                    <p>{sim["sim_type"]["description"]}</p>
                    <h4>Drops</h4>
                    <Stack wrap spacing={6}>
                    {drops?.map((item) => ( <ItemDropCard item={item}/> ))}
                    {/* <p>{simTypes && sim[2]['description']}</p> */}
                    </Stack>
                    {/* <p>{simTypes && sim[2]['description']}</p> */} 
                    <hr/>
                </>
                <Button appearance="primary" color="red" block>
                    Delete
                </Button>
                <hr/>
            </Drawer.Body>
          </Drawer>

          <Modal backdrop={"static"} keyboard={false} open={openCollectModal} onClose={handleCloseModal}>
            <Modal.Header>
            <Modal.Title></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {collectableObj ? (
                    <>
                    <h4>You got a {collectableObj['item']['name']}!</h4>
                    <Avatar onClick={handleOpen} style={{height: "200px", width: "200px"}}>
                    <img  height="100%" src={collectableObj['item']["path"]}/>
                    </Avatar>
                    <p>{collectableObj['item']["description"]}</p>
                    <p>{collectableObj['item']["rarity"]}</p>
                    </>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <Loader size="lg" />
                    </div> 
                )}
            
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleCloseModal} appearance="primary">
                close
            </Button>
            <Button onClick={handleCloseModal} appearance="subtle">
                Go To Inventory
            </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default SimulationCard