import { useEffect, useState } from 'react';
import { Avatar, Button, ButtonGroup, Col, Panel, Placeholder, Progress, Row } from 'rsuite';
function SimulationCard({sim}){
    const [percent, setPercent] = useState(0);

    useEffect(() =>{
        sim['sim_type']['gestation']
        let created_at =  Date.parse(sim['created_at'])
        let now = new Date()
        
        let dif = now - created_at

        let difMins = Math.floor((dif/60000))

        if (Math.floor((difMins/sim['sim_type']['gestation']) * 100 ) > 100){
            setPercent(100)
            fetch('https://nrpcmqkzpwyhpqnxkftn.supabase.co/functions/v1/roll-for-item', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "planet_id": sim['id'],
                   "user_id": "8275a7a6-5a5a-4893-b3f6-3f2580420750"
                }
            )
            })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
        } else {
            setPercent( Math.floor((difMins/sim['sim_type']['gestation']) * 100 ))
            
        }

    }, [])

    

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
    <Panel header={sim["name"]} style={{width: "250px", height: "390px", alignContent: "center"}}  bordered>
        <img height="200px" width="200px" src={sim["sim_type"]["world_image"]} />
        <Progress.Line percent={percent} strokeColor={color} status={status} />
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
    )
}

export default SimulationCard