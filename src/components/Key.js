import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled, almost, correct }) => {
  const { onDelete, onSelectLetter, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className="key"
      id={
        bigKey
          ? "big"
          : disabled
          ? "disabled"
          : almost
          ? "almost"
          : correct && "correct"
      }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
