import style from "./footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className='container mx-auto'>
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
