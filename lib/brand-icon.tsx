export function BrandIcon({
  size,
  rounded = false,
}: {
  size: number;
  rounded?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        borderRadius: rounded ? Math.round(size * 0.22) : 0,
      }}
    >
      <div
        style={{
          width: Math.round(size * 0.44),
          height: Math.round(size * 0.22),
          borderLeft: `${Math.round(size * 0.1)}px solid white`,
          borderBottom: `${Math.round(size * 0.1)}px solid white`,
          transform: "rotate(-45deg)",
          marginTop: -Math.round(size * 0.06),
        }}
      />
    </div>
  );
}
