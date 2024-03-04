import { Link } from "react-router-dom";
import SifiCard from "../../Components/SifiCard";

function Splash() {
  return (
    <>
      {/*----------SECTION 1----------*/}
      <div className="crt mt-0 section w-full overflow-hidden h-screen max-h-[90vh] flex gap-12 md:gap-0 flex-row place-items-center">
        <div className="w-2/3 md:w-1/2 flex flex-col place-items-end">
          <h1 className="text-3xl md:text-5xl lg:text-7xl mb-2 uppercase font-thin tracking-widest">
            Do you want <br />
            to get rich?
          </h1>
          <div className="w-full text-right px-6 py-4 border-2 border-t-[#FFD1B2] border-r-[#FFD1B2] border-b-black border-l-black after:-z-10 after:blur-sm after:h-[70px] after:w-2/3 md:after:w-1/2 after:absolute after:left-0 after:mt-[-51px] after:border-4 after:border-t-[#FFD1B2] after:border-r-[#FFD1B2] after:border-b-black after:border-l-black">
            <Link to="/login">
              <p className="pt-2 font-black underline uppercase tracking-wide underline-offset-8 hover:underline-offset-[12px] hover:drop-shadow-[0_4px_21px_rgba(255,235,205,1)]  transition-all duration-300 cursor-pointer">
                Start Mining Today!
              </p>
            </Link>
          </div>
        </div>

        <img
          className="rotate-180 md:rotate-0 h-[50vh] md:h-[70vh] -mr-[420px] inline-block"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/dsadsdsfssdsd%201%20(2).png"
        />
      </div>
      {/*----------SECTION 2----------*/}
      <div className="sect pb-[400px] md:py-[250px]">
        <div className="bg-[#13131F] w-full h-[400px] align-center">
          <div className="flex flex-wrap">
            <div className="mx-auto w-full md:w-1/2">
              <img
                className="max-w-[350px] mt-[-150px] m-auto"
                src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20244%20(1).png"
              />
            </div>

            <div className="my-auto w-full md:w-1/2">
              <p className="md:text-5xl text-4xl text-center md:text-left lg:text-7xl uppercase font-black tracking-[20px] ">
                <span className="text-[#FFD1B2]">Space</span> Money
                <br /> Hits Different
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*----------SECTION 3----------*/}
      <div className="sect">
        <div className="w-full py-auto h-[800px] bg-no-repeat bg-center bg-[url(https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/RedPlanet.png?t=2024-02-24T03%3A43%3A19.358Z)]">
          <div className="pt-[100px] md:pt-[180px] px-[20px] max-w-[800px] m-auto">
            <SifiCard title="Welcome To Meta Miners">
              <p className="text-lg md:text-2xl">
                META MINERS is a free-to-play Idle collectors game that combines
                the excitement of mining cryptocurrency with the thrill of
                collecting NFTs. Immerse yourself in a simulated universe, where
                entire planets come to life as the locals pay tribute to their
                creator. With over 200+ items to collect from 5 obscure and
                unique worlds, the possibilities are endless. Whether you're a
                seasoned gamer or a work-from-home superstar looking for an idle
                game to make time fly, META MINERS scratches the itch like no
                other. Get ready to dive into a world of endless possibilities
                and become the ultimate META Miners champion!
              </p>
              <p>Start Mining Today!</p>
            </SifiCard>
          </div>
        </div>
      </div>
      {/*----------SECTION 4----------*/}
      <div className="sect pb-[400px] md:py-[250px]">
        <div className="bg-[#13131F]  w-full h-[400px] align-center">
          <div className="flex flex-wrap">
            <div className="my-auto w-full md:w-1/2">
              <p className="md:text-5xl text-4xl text-center md:text-right lg:text-7xl uppercase font-black tracking-[20px] ">
                Collect
                <br />
                <span className="text-[#FFD1B2]">Hundreds</span>
                <br /> of Unique <br />
                Items
              </p>
            </div>{" "}
            <div className="mx-auto w-full md:w-1/2">
              <img
                className="max-w-[350px] mt-[-150px] m-auto"
                src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20244%20(1).png"
              />
            </div>
          </div>
        </div>
      </div>
      {/*----------SECTION 5----------*/}
      <div className="sect">
        <div className="w-full py-auto h-[800px] bg-no-repeat bg-center bg-[url(https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/RedPlanet.png?t=2024-02-24T03%3A43%3A19.358Z)]">
          <div className="pt-[250px] max-w-[800px] m-auto">
            <SifiCard title="Welcome To Meta Miners">
              <p className="text-lg">
                Are you ready for an exhilarating gaming experience? Look no
                further than "MEAT MINERS"! This free-to-play game combines the
                excitement of mining cryptocurrency with the thrill of
                collecting NFTs. Immerse yourself in a simulated universe, where
                entire planets come to life as the locals pay tribute to their
                creator. With over 200+ items to collect from 5 obscure and
                unique worlds, the possibilities are endless. Whether you're a
                seasoned gamer or a work-from-home superstar looking for an idle
                game demo, "MEAT MINERS" offers an adventure like no other. Get
                ready to dive into a world of endless possibilities and become
                the ultimate crypto-collecting champion!
              </p>

              <p>Start Mining Today!</p>
            </SifiCard>
          </div>
        </div>
      </div>
      <div className=" w-full h-[500px] overflow-hidden">
        <img
          className="w-full scale-[1.5] relative top-[500px] -rotate-90"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20238%20(1).png"
        />
      </div>
    </>
  );
}

// // Set the scroll amount for each "chunk"
// const CHUNK_SIZE = 12; // pixels

// // Throttle the scroll event to prevent performance issues
// let isScrolling = false;
// let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

// window.addEventListener('scroll', () => {
//   if (!isScrolling) {
//     isScrolling = true;

//     // Timeout to throttle the scroll event
//     setTimeout(() => {
//       // Determine the direction of the scroll
//       const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
//       const scrollDown = currentScroll > lastScrollTop;

//       // Calculate the next scroll position
//       let nextScroll;
//       if (scrollDown) {
//         nextScroll = Math.ceil(currentScroll / CHUNK_SIZE) * CHUNK_SIZE;
//       } else {
//         nextScroll = Math.floor(currentScroll / CHUNK_SIZE) * CHUNK_SIZE;
//       }

//       // Scroll to the next chunk
//       window.scrollTo({
//         top: nextScroll,
//         behavior: 'instant'
//       });

//       // Update last scroll position
//       lastScrollTop = nextScroll;
//       isScrolling = false;
//     }, 12);
//   } else {
//     // Prevent default scrolling behavior while we are adjusting the scroll position
//     event.preventDefault();
//   }
// }, { passive: false });

export default Splash;
