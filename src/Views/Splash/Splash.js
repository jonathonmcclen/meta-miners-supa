import { Link } from "react-router-dom";
import SifiCard from "../../Components/SifiCard";

function Splash() {
  return (
    <>
      <div className="crt mt-[100px] md:mt-0 section w-full overflow-hidden h-screen max-h-[90vh] flex gap-12 md:gap-0 flex-row place-items-center">
        <div className="w-2/3 md:w-1/2 flex flex-col place-items-end">
          <h1 className="text-3xl md:text-5xl lg:text-7xl mb-2 uppercase font-thin tracking-widest">
            Do you want <br />
            to get rich?
          </h1>
          <div className="w-full text-right px-6 py-4 border-2 border-t-[#FFD1B2] border-r-[#FFD1B2] border-b-black border-l-black after:-z-10 after:blur-sm after:h-[70px] after:w-2/3 md:after:w-1/2 after:absolute after:left-0 after:mt-[-51px] after:border-4 after:border-t-[#FFD1B2] after:border-r-[#FFD1B2] after:border-b-black after:border-l-black">
            <p className="pt-2 font-black underline uppercase tracking-wide underline-offset-8 hover:underline-offset-[12px] hover:drop-shadow-[0_4px_21px_rgba(255,235,205,1)]  transition-all duration-300 cursor-pointer">
              Start Mining Today!
            </p>
          </div>
        </div>

        <img
          className="rotate-180 md:rotate-0 h-[50vh] md:h-[70vh] -mr-[420px] inline-block"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/dsadsdsfssdsd%201%20(2).png"
        />
      </div>
      <div className="bg-[#13131F] relative mt-[250px] h-[400px] align-center">
        <div className="flex gap-12 w-fit mx-auto z-10">
          <div className="mx-auto">
            <img
              className="max-w-[350px] mt-[-150px]"
              src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20244%20(1).png"
            />
          </div>
          <div className="my-auto">
            <p className="text-5xl lg:text-7xl uppercase font-black tracking-[20px]">
              <span className="text-[#FFD1B2]">Space</span> Money
              <br /> Hits Different
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full h-[1000px] overflow-hidden">
        <img
          className="w-full scale-[1.5] relative top-[800px] -rotate-90"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20238%20(1).png"
        />
      </div>
      <div className="section w-full max-h-[90vh] static">
        <SifiCard className=" p-[50px] border-2 border-[#22FC37]">
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
        </SifiCard>
      </div>
      <div className="bg-[#13131F]  my-[250px] h-[400px] align-center">
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
      <div className=" w-full h-[500px] overflow-hidden">
        <img
          className="w-full scale-[1.5] relative top-[500px] -rotate-90"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20238%20(1).png"
        />
      </div>
    </>
  );
}

export default Splash;
