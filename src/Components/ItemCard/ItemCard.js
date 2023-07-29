import { Avatar, AvatarGroup, Button, Container, Content, Modal, Sidebar, Stack, Tag } from "rsuite";
import UserIcon from '@rsuite/icons/legacy/User';
import { useState } from "react";
import { useAuth } from "../../hooks/Auth";
import { supabaseClient } from "../../config/supabase-client";

function ItemCard({item}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {user} = useAuth()
    
    const [newSimModalOpen, setNewSimModalOpen] = useState(false)
    
    // const handleAddSim = async function() {
    //     const { data, error } = await supabase
    //     .from('simulations')
    //     .insert([
    //         { some_column: 'someValue', other_column: 'otherValue' },
    //     ])
    //     .select()
    // }

    const sellItem = async () => {
        const { data: obj, error } = await supabaseClient.functions.invoke('sell-item', {
            body: {
                item_id: `${item["id"]}`,
                user_id: user.id
            }
        })
        setTimeout(window.location.reload(true), 5000)
    }

    function handleModal(){
        setNewSimModalOpen(true)
    }

    const common = {height: "100px", width: "100px"}
    const uncommon = {height: "100px", width: "100px", background: '#1e853a'}
    const rare = {height: "100px", width: "100px", background: '#cc7f02'}

    const commonLg = {height: "200px", width: "200px"}
    const uncommonLg = {height: "200px", width: "200px", background: '#1e853a'}
    const rareLg = {height: "200px", width: "200px", background: '#cc7f02'}

    return(
        <>
        {item["items"]['rarity'] == 1 &&
            <Avatar onClick={handleOpen} style={common}>
                <Avatar style={{width: 90, height: 90}}>
                    <img  height="100%" src={item["items"]["path"]}/>
                </Avatar>
                <Tag size="md" style={{position: "absolute", marginTop: 70, marginLeft: 30}}>{item["count"]}</Tag>
            </Avatar>
        }

        {item["items"]['rarity'] == 2 &&
            <Avatar onClick={handleOpen} style={uncommon}>
                <Avatar style={{width: 90, height: 90}}>
                    <img  height="100%" src={item["items"]["path"]}/>
                </Avatar>
                <Tag size="md" style={{position: "absolute", marginTop: 70, marginLeft: 30}}>{item["count"]}</Tag>
            </Avatar>
        }

        {item["items"]['rarity'] == 3 &&
            <Avatar onClick={handleOpen} style={rare}>
                <Avatar style={{width: 90, height: 90}}>
                    <img  height="100%" src={item["items"]["path"]}/>
                </Avatar>
                <Tag size="md" style={{position: "absolute", marginTop: 70, marginLeft: 30}}>{item["count"]}</Tag>
            </Avatar>
        }
        <Modal open={open} onClose={handleClose}>
        <Modal.Header>
        <Modal.Title> 
            {item["items"]["name"]}
            {" " + " " + " " + " " + " "}
            <Tag size="lg">x{item["count"]}</Tag>
            
            {item["items"]['rarity'] == 1 &&
            <Tag size="lg" >Common</Tag>
            }

            {item["items"]['rarity'] == 2 &&
            <Tag size="lg" color="green">uncommon</Tag>
            }

            {item["items"]['rarity'] == 3 &&
            <Tag size="lg" color="orange">Rare</Tag>
            }
            {" " + " " + " "}

            
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Sidebar>
                    {item["items"]['rarity'] == 1 &&
                        <Avatar onClick={handleOpen} style={commonLg}>
                            <Avatar style={{width: 190, height: 190}}>
                                <img  height="100%" src={item["items"]["path"]}/>
                            </Avatar>
                        </Avatar>
                    }

                    {item["items"]['rarity'] == 2 &&
                        <Avatar onClick={handleOpen} style={uncommonLg}>
                            <Avatar style={{width: 190, height: 190}}>
                                <img  height="100%" src={item["items"]["path"]}/>
                            </Avatar>
                        </Avatar>
                    }

                    {item["items"]['rarity'] == 3 &&
                        <Avatar onClick={handleOpen} style={rareLg}>
                            <Avatar style={{width: 190, height: 190}}>
                                <img  height="100%" src={item["items"]["path"]}/>
                            </Avatar>
                        </Avatar>
                    }
                </Sidebar>
                <Content><p>{item["items"]["description"]}</p></Content>
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
    )
}

export default ItemCard;