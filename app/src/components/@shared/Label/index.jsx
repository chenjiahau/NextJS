import styles from "./label.module.scss";

const Label = ({ text }) => {
  return <div className={styles.label}>{text}</div>;
};

export default Label;
