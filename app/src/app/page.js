import style from './page.module.scss';

export default function Home() {
  return (
    <div className="primary-content">
      <div className={style.container}>
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg">
          This is a simple blog built with Next.js and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
