import { Avatar, AvatarGroup, Button, Modal, Stack } from "rsuite";
import UserIcon from '@rsuite/icons/legacy/User';
import { useState } from "react";

function ItemDropCard({item, outline = false}){
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

    const common = {height: "50px", width: "50px"}
    const uncommon = {height: "50px", width: "50px", background: '#1e853a'}
    const rare = {height: "50px", width: "50px", background: '#cc7f02'}

    return(
        <>
        {item['rarity'] == 1 &&
            <Avatar onClick={handleOpen} style={common}>
                {outline ? (<img style={outline && {filter: 'contrast(0)'}} height="100%" src={item["path"]}/>) : (<img height="100%" src={item["path"]}/>)}
            </Avatar>
        }

        {item['rarity'] == 2 &&
            <Avatar onClick={handleOpen} style={uncommon}>
                {outline ? (<img style={outline && {filter: 'contrast(0)'}} height="100%" src={item["path"]}/>) : (<img height="100%" src={item["path"]}/>)}
            </Avatar>
        }

        {item['rarity'] == 3 &&
            <Avatar onClick={handleOpen} style={rare}>
                {outline ? (<img style={outline && {filter: 'contrast(0)'}} height="100%" src={item["path"]}/>) : (<img height="100%" src={item["path"]}/>)}
            </Avatar>
        }
        
        <Modal open={open} onClose={handleClose}>
        <Modal.Header>
        <Modal.Title>{item["name"]} {"(x"}{item["count"]}{")"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack spacing={6}>
                <Avatar onClick={handleOpen} style={{height: "200px", width: "200px"}}>
                <img  height="100%" src={item["path"]}/>
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
    )
}

export default ItemDropCard;