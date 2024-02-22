function Button({ title, color = "#22FC37" }) {
  return (
    <>
      <div
        style={{ backgroundColor: color }}
        className=" p-[10px] block text-black w-full"
      >
        {title}
      </div>
    </>
  );
}

export default Button;
