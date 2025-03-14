import React from "react";

function prayar({ name, time }) {
  return (
    <div className="prayar">
      <p className="name_prayar">{name}</p>
      <p className="time_prayar">{time}</p>
    </div>
  );
}

export default prayar;
