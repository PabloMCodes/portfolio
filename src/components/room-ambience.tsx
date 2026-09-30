export function RoomAmbience({ page }: { page: string }) {
  return (
    <div className="room-ambience" data-room-page={page} aria-hidden="true">
      <div className="pendant-light">
        <span className="pendant-cord" />
        <span className="pendant-glow" />
        <span className="pendant-shade" />
        <span className="pendant-bulb" />
      </div>

      <div className="plant-shelf">
        <span className="shelf-board" />
        <span className="shelf-bracket" />
        <span className="shelf-pot" />
        <svg className="shelf-vine" viewBox="0 0 150 310">
          <path className="plant-stem" d="M76 11c-5 58 31 72 17 125-9 35-49 43-39 89 5 25 28 38 26 76M77 63c-25 4-38 17-49 36M92 128c27 7 38 22 42 43M56 201c-24 4-37 18-43 38M73 258c25 5 38 19 48 38" />
          <g className="plant-leaves">
            <ellipse cx="32" cy="92" rx="25" ry="11" transform="rotate(-35 32 92)" />
            <ellipse cx="60" cy="72" rx="24" ry="11" transform="rotate(32 60 72)" />
            <ellipse cx="126" cy="165" rx="26" ry="11" transform="rotate(35 126 165)" />
            <ellipse cx="101" cy="139" rx="24" ry="10" transform="rotate(-38 101 139)" />
            <ellipse cx="20" cy="234" rx="25" ry="11" transform="rotate(-30 20 234)" />
            <ellipse cx="48" cy="214" rx="24" ry="10" transform="rotate(37 48 214)" />
            <ellipse cx="117" cy="291" rx="26" ry="11" transform="rotate(36 117 291)" />
            <ellipse cx="80" cy="269" rx="23" ry="10" transform="rotate(-35 80 269)" />
          </g>
        </svg>
      </div>

      <div className="table-lamp">
        <span className="table-lamp-glow" />
        <span className="table-lamp-shade" />
        <span className="table-lamp-stem" />
        <span className="table-lamp-base" />
      </div>

    </div>
  );
}
