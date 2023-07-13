import { Panel, Stack } from 'rsuite';

function WelcomePage() {
  return (
    <Stack direction="column" spacing={20} alignItems="center" style={{ marginTop: 30 }}>
      <h1>Welcome to META MINERS!</h1>
      <Panel shaded bordered bodyFill style={{ display: 'inline-block', maxWidth: 1000, minWidth: 1000 }}>

        <Panel header="Getting Started">

          <p>
            First, welcome miner! I know your itching to get started mining, simulating fantastical worlds and mining them for collectible resources.
            META MINERS is a idle mining platform. Feel free to go about your business while your set up simulators produce resources every 20-30 minutes.
            as you colect items/resources you can choose to sell them for eC {"("} eatherCoin {")"}. eC be used to buy resources from other MINERS
            as well as purchase more simulation types for a chance of higher rarity drops. The choice is yours!
          </p>
          <>
            <ol>
              <li>Create a new simulation</li>
              <p>by defualt a free account is allowed 3 simulations</p>
              {/* <li>Wait for civilization to form and develop</li>
                <p></p> */}
              <li>Then your simulator will start working for you</li>
              <p>some worlds take longer to output resources than others</p>
              <li></li>
            </ol>
          </>
        </Panel>
      </Panel>
    </Stack>
  );
}

export default WelcomePage;
