"use client";

import style from "./ab.module.scss";

const ActionButton = ({ text, onClick, type = "button", isCancel = false }) => {
  return (
    <button
      type={type}
      className={`${style["action-button"]} ${
        isCancel ? style["cancel-button"] : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
