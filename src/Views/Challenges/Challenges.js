import { useEffect, useState } from "react"
import { Container, Loader, Panel, PanelGroup, Sidebar, Stack } from "rsuite"
import { supabaseClient } from "../../config/supabase-client"
import ItemDropCard from "../../Components/ItemDropCard"

function Challenges() {

    const [challenges, setChallenges] = useState(null)
    const [loading, setLoading] = useState(null)

    const [collection, setCollection] = useState(null)

    useEffect(() => {

        async function getChallenges() {
            setLoading(true) 
    
            let { data, error } = await supabaseClient
            .from('challenges')
            .select('*')    
      
            if (error) {
              console.warn(error)
            } else if (data) {
                setChallenges(data)
            }
            setLoading(false)
        }
 
        getChallenges()
        console.log(challenges) 
    }, [])  

    async function getCollection(id){
        let { data: collection, error } = await supabaseClient
        .from('items')
        .select('*')
        .filter('challenges', 'cs', `{"${id}"}`)
        .order('rarity', { ascending: true })

        setCollection(collection)
    }



    return(<>

        {challenges ? 
        (
        <>
            <h1>Challenges</h1>
            <PanelGroup accordion defaultActiveKey={1} bordered>
                {challenges?.map((challenge, i ) => ( 
                <Panel onClick={(event) => getCollection(challenge['id'])} header={challenge['name'] + " | " + challenge['description']} id="panel1">
                    <img width={100} height={100} src={challenge['badge']}/>
                    <Stack wrap spacing={5}>
                        {collection?.map((item) => ( <ItemDropCard outline={true} item={item}/> ))}
                        <Container><p>{challenge['collection']}</p></Container>
                    </Stack>
                </Panel>
                ))}
            </PanelGroup>
            
        </>
        ) 
        : 
        (
        <Loader size="lg" content="Large" />
        )
        }
    </>)
}

export default Challenges