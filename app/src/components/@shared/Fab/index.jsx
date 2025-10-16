"use client";

import styles from "./fab.module.scss";
import Link from "next/link";

export default function Fab({ href, onClick, label = "Create" }) {
  const content = (
    <>
      <span className='sr-only'>{label}</span>
      <svg
        aria-hidden='true'
        viewBox='0 0 24 24'
        className='h-6 w-6'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 5v14M5 12h14'
        />
      </svg>
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={styles.fab}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type='button'
      aria-label={label}
      onClick={onClick}
      className={styles.fab}
    >
      {content}
    </button>
  );
}
