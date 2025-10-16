import style from "./pc.module.scss";

const PrimaryContent = ({ children }) => {
  return <main className={style["primary-content"]}>{children}</main>;
};

export default PrimaryContent;
