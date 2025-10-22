import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <main className={styles.loading}>
      <div className={styles.spinner}></div>
      <span className={styles.text}>Loading...</span>
    </main>
  );
}
