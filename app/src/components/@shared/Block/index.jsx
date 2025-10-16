import style from "./block.module.scss";

const Block = ({ children }) => {
  return <div className={style.block}>{children}</div>;
};

export default Block;
