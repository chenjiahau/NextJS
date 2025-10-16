"use client";

import style from "./ia.module.scss";

const InputArea = ({ value, onChange, placeholder }) => {
  return (
    <div className={style["input-area"]}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={style.textarea}
      />
    </div>
  );
};

export default InputArea;
