import { Avatar, AvatarGroup, Button, Modal } from "rsuite";
import UserIcon from '@rsuite/icons/legacy/User';
import { useState } from "react";

function ItemCard({item}){
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

    const common = {height: "100px", width: "100px"}
    const uncommon = {height: "100px", width: "100px", background: '#1e853a'}
    const rare = {height: "100px", width: "100px", background: '#cc7f02'}

    return(
        <>
        {item["items"]['rarity'] == 1 &&
            <Avatar onClick={handleOpen} style={common}>
            <img  height="100%" src={item["items"]["path"]}/>
            </Avatar>
        }

        {item["items"]['rarity'] == 2 &&
            <Avatar onClick={handleOpen} style={uncommon}>
            <img  height="100%" src={item["items"]["path"]}/>
            </Avatar>
        }

        {item["items"]['rarity'] == 3 &&
            <Avatar onClick={handleOpen} style={rare}>
            <img  height="100%" src={item["items"]["path"]}/>
            </Avatar>
        }
        <Modal open={open} onClose={handleClose}>
        <Modal.Header>
        <Modal.Title>{item["items"]["name"]} {"(x"}{item["count"]}{")"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Avatar onClick={handleOpen} style={{height: "200px", width: "200px"}}>
        <img  height="100%" src={item["items"]["path"]}/>
        </Avatar>
        <p>{item["items"]["description"]}</p>
        <p>{item["items"]["rarity"]}</p>

        </Modal.Body>
        <Modal.Footer>
        <Button onClick={handleClose} appearance="primary">
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