function Splash() {
  return (
    <>
      <div className="section w-full h-screen max-h-[90vh] flex place-items-center">
  
        <div className="flex flex-col">
          <h1 className="px-[50px] text-7xl uppercase font-thin tracking-widest">Do you want <br/>to get rich?</h1>
          <div className="px-[50px] border-2 border-t-[#22FC37] border-r-[#22FC37] border-b-black border-l-black">
          <p className="pt-4 font-black underline uppercase tracking-wide underline-offset-8 hover:underline-offset-[12px] hover:drop-shadow-[0_4px_21px_rgba(255,235,205,1)]  transition-all duration-300 cursor-pointer">Start Mining Today!</p>
          </div>
        </div>
 
        <img
          className="h-[70vh] inline-block"
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
