"use client";

import style from "./ib.module.scss";

const InputBox = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <div className={style["input-box"]}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={style.input}
      />
    </div>
  );
};

export default InputBox;
