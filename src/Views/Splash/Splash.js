function Splash() {
  return (
    <>
      <div className="mt-[100px] md:mt-0 section w-full overflow-hidden h-screen max-h-[90vh] flex gap-12 md:gap-0 flex-row place-items-center">
  
        <div className="w-2/3 md:w-1/2 flex flex-col place-items-end">
          <h1 className="text-3xl md:text-5xl lg:text-7xl uppercase font-thin tracking-widest">Do you want <br/>to get rich?</h1>
          <div className="w-full text-right px-6 py-4 border-2 border-t-[#22FC37] border-r-[#22FC37] border-b-black border-l-black">
          <p className="pt-2 font-black underline uppercase tracking-wide underline-offset-8 hover:underline-offset-[12px] hover:drop-shadow-[0_4px_21px_rgba(255,235,205,1)]  transition-all duration-300 cursor-pointer">Start Mining Today!</p>
          </div>
        </div>
 
        <img
          className="rotate-180 md:rotate-0 h-[50vh] md:h-[70vh] -mr-[420px] inline-block"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/dsadsdsfssdsd%201%20(2).png"
        />
      </div>

      <div className="bg-[#13131F]">pijpij</div>
      <div className="section flex">
        <div className=" mx-auto">
          <img
            className="max-w-[350px]"
            src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Group%20244.png"
          />
        </div>
        <div className="p-5 mr-[20%] my-auto">
          <p className="text-7xl uppercase font-black tracking-[20px] leading-relaxed">
            Something
            <br /> about the
            <br /> game
          </p>
        </div>
      </div>
    </>
  );
}

export default Splash;
