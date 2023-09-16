function ReleaseNotes({ header, content }) {
  return (
    <div>
      <div
        style={{
          borderRadius: "0px 20px 0px 0px",
          width: "100%",
          background: "#7940CF",
          padding: "20px",
          margin: "0",
        }}
      ></div>
      <div
        style={{
          borderRadius: "0px 0px 0px 20px",
          width: "100%",
          background: "#1D202D",
          padding: "20px",
        }}
      >
        <h2>{header}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
}

export default ReleaseNotes;
