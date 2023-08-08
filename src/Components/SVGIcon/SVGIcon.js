function SVGIcon({ points, height, width = height }) {
  return (
    <>
      <div>
        <svg width={height} height={width}>
          <polygon
            points={points}
            style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;"
          />
        </svg>
      </div>
    </>
  );
}
export default SVGIcon;
