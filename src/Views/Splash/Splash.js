import { Link } from "react-router-dom";

function Splash() {
  return (
    <>
      <div className="section w-full h-screen max-h-[90vh] flex place-items-center">
        <div className="flex flex-col">
          <h1 className="px-[50px] text-7xl uppercase font-thin tracking-widest">
            Do you want <br />
            to get rich?
          </h1>
          <div className="px-[50px] border-2 border-t-[#22FC37] border-r-[#22FC37] border-b-black border-l-black">
            <Link to="/login">
              <p className="pt-4 font-black underline uppercase tracking-wide underline-offset-8 hover:underline-offset-[12px] hover:drop-shadow-[0_4px_21px_rgba(255,235,205,1)]  transition-all duration-300 cursor-pointer">
                Start Mining Today!
              </p>
            </Link>
          </div>
        </div>

        <img
          className="h-[70vh] inline-block"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/dsadsdsfssdsd%201%20(2).png"
        />
      </div>
      <div className="bg-[#13131F] relative top-[300px] h-[400px] align-center">
        <div className="flex z-10">
          <div className="mx-auto">
            <img
              className="max-w-[350px] mt-[-150px]"
              src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20244%20(1).png"
            />
          </div>
          <div className="p-5 mr-[20%] my-auto">
            <p className="text-7xl uppercase font-black tracking-[20px] leading-relaxed">
              <span className="text-[#FFD1B2]">Space</span> Money
              <br /> Hits <br />
              Different
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full h-[1000px] overflow-hidden">
        <div className=" p-[50px] border-2 border-[#22FC37]">
          <h1 className="text-5xl">Welcome To Meta Miners</h1>
          <p>Start Mining Today!</p>
          <p>
            Are you ready for an exhilarating gaming experience? Look no further
            than "MEAT MINERS"! This free-to-play game combines the excitement
            of mining cryptocurrency with the thrill of collecting NFTs. Immerse
            yourself in a simulated universe, where entire planets come to life
            as the locals pay tribute to their creator. With over 200+ items to
            collect from 5 obscure and unique worlds, the possibilities are
            endless. Whether you're a seasoned gamer or a work-from-home
            superstar looking for an idle game demo, "MEAT MINERS" offers an
            adventure like no other. Get ready to dive into a world of endless
            possibilities and become the ultimate crypto-collecting champion!
          </p>
        </div>

        <img
          className="w-full scale-[1.5] relative top-[800px] animate-spin"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20238%20(1).png"
        />
      </div>
      <div className="section w-full max-h-[90vh] static">
        <div className="absolute p-[50px] border-2 border-[#22FC37]">
          <h1 className="text-5xl">Welcome To Meta Miners</h1>
          <p>Start Mining Today!</p>
          <p>
            Are you ready for an exhilarating gaming experience? Look no further
            than "MEAT MINERS"! This free-to-play game combines the excitement
            of mining cryptocurrency with the thrill of collecting NFTs. Immerse
            yourself in a simulated universe, where entire planets come to life
            as the locals pay tribute to their creator. With over 200+ items to
            collect from 5 obscure and unique worlds, the possibilities are
            endless. Whether you're a seasoned gamer or a work-from-home
            superstar looking for an idle game demo, "MEAT MINERS" offers an
            adventure like no other. Get ready to dive into a world of endless
            possibilities and become the ultimate crypto-collecting champion!
          </p>
        </div>
      </div>
      <div className="bg-[#13131F] relative top-[300px] h-[400px] align-center">
        <div className="flex z-10 m-[100px]">
          <div className="mx-auto">
            <img
              className="max-w-[350px] mt-[-150px]"
              src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20244%20(1).png"
            />
          </div>
          <div className="p-5 mr-[20%] my-auto">
            <p className="text-7xl uppercase font-black tracking-[20px] leading-relaxed">
              <span className="text-[#FFD1B2]">Collect</span>
              <br /> Hundreds of <br />
              rare Items
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Splash;
