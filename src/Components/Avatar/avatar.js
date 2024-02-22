function Avatar({
  title = "",
  subTitle = "",
  color = "#22FC37",
  img = "",
  bgColor = "#22FC37",
}) {
  return (
    <>
      <div className="block bg-red-800 w-[150px] overflow-hidden">
        <div className="flex h-[40px] mt-[]">
          <div style={{ backgroundColor: `${bgColor}` }}>
            <img className="h-full center" src={img} />
          </div>
          <div className=" w-8/12 bg-red-100 h-full grid grid-cols-1">
            <p className="m-0">
              <strong>{title}</strong>
            </p>
            <p className="m-0">
              <strong>{subTitle}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Avatar;
