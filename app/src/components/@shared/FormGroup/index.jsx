import style from "./fg.module.scss";

const FormGroup = ({ leftElement, rightElement }) => {
  return (
    <div className={style["form-group"]}>
      <div className={style["form-group__left"]}>{leftElement}</div>
      <div className={style["form-group__right"]}>{rightElement}</div>
    </div>
  );
};

export default FormGroup;
