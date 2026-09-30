export function RoomAmbience() {
  return (
    <div className="room-ambience" aria-hidden="true">
      <div className="pendant-light">
        <span className="pendant-cord" />
        <span className="pendant-glow" />
        <span className="pendant-shade" />
        <span className="pendant-bulb" />
      </div>

      <svg className="room-plant room-plant-left" viewBox="0 0 240 420">
        <path className="plant-stem" d="M121 390C119 300 118 218 91 142M119 323c32-53 48-113 48-181M116 279c-37-47-50-94-49-151M126 235c25-41 39-81 39-121" />
        <g className="plant-leaves">
          <ellipse cx="77" cy="130" rx="33" ry="15" transform="rotate(35 77 130)" />
          <ellipse cx="55" cy="173" rx="34" ry="15" transform="rotate(14 55 173)" />
          <ellipse cx="91" cy="210" rx="36" ry="16" transform="rotate(48 91 210)" />
          <ellipse cx="157" cy="130" rx="34" ry="15" transform="rotate(-42 157 130)" />
          <ellipse cx="173" cy="177" rx="37" ry="16" transform="rotate(-22 173 177)" />
          <ellipse cx="149" cy="224" rx="35" ry="15" transform="rotate(-47 149 224)" />
          <ellipse cx="88" cy="271" rx="34" ry="15" transform="rotate(29 88 271)" />
          <ellipse cx="153" cy="290" rx="34" ry="15" transform="rotate(-27 153 290)" />
        </g>
        <path className="plant-pot" d="M70 337h101l-14 65H84Z" />
        <path className="plant-pot-rim" d="M64 331h113v17H64Z" />
      </svg>

      <div className="table-lamp">
        <span className="table-lamp-glow" />
        <span className="table-lamp-shade" />
        <span className="table-lamp-stem" />
        <span className="table-lamp-base" />
      </div>

      <svg className="room-plant room-plant-right" viewBox="0 0 180 300">
        <path className="plant-stem" d="M92 275c0-73-5-137 15-204M91 230c-29-35-43-76-43-119M94 185c30-32 39-66 40-101" />
        <g className="plant-leaves">
          <ellipse cx="42" cy="103" rx="27" ry="12" transform="rotate(36 42 103)" />
          <ellipse cx="61" cy="151" rx="30" ry="13" transform="rotate(38 61 151)" />
          <ellipse cx="124" cy="78" rx="29" ry="13" transform="rotate(-38 124 78)" />
          <ellipse cx="130" cy="127" rx="30" ry="13" transform="rotate(-27 130 127)" />
          <ellipse cx="119" cy="177" rx="28" ry="12" transform="rotate(-42 119 177)" />
        </g>
        <path className="plant-pot" d="M53 237h78l-11 51H64Z" />
        <path className="plant-pot-rim" d="M48 232h88v14H48Z" />
      </svg>
    </div>
  );
}
