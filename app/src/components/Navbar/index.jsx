"use client";

import style from "./navbar.module.scss";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { loggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <nav className={style.navbar}>
      <h1 className={style.title}>My Blog</h1>
      <ul className='flex space-x-4'>
        <li>
          <Link href='/' className={style.link}>
            Home
          </Link>
        </li>

        {loggedIn && (
          <>
            <li>
              <Link href='/article' className={style.link}>
                Article
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={style.link}>
                Logout
              </button>
            </li>
          </>
        )}

        {!loggedIn && (
          <>
            <li>
              <Link href='/login' className={style.link}>
                Login
              </Link>
            </li>
            <li>
              <Link href='/signup' className={style.link}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
