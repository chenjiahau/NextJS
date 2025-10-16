import style from "./navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <h1 className={style.title}>My Blog</h1>
      <ul className='flex space-x-4'>
        <li>
          <Link href='/' className={style.link}>
            Home
          </Link>
        </li>
        <li>
          <Link href='/article' className={style.link}>
            Article
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
