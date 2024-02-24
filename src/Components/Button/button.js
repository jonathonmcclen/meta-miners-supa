function Button({ title, color = "#F0FFFF" }) {
  return (
    <>
      <div
        style={{ backgroundColor: color }}
        className=" p-[10px] block text-black w-full hover:brightness-110 hover:drop-shadow-[0_4px_12px_rgba(255,235,205,.5)] transition-all duration-700 "
      >
        {title}
      </div>
    </>
  );
}

export default Button;
