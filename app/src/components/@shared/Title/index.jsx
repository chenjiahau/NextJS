import style from "./title.module.scss";

const Title = ({ children }) => {
  return <h1 className={style.title}>{children}</h1>;
};

export default Title;
