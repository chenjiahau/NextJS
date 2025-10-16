import style from "./bg.module.scss";

const ButtonGroup = ({ children }) => {
  return <div className={style["button-group"]}>{children}</div>;
};

export default ButtonGroup;
