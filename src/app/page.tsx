import Form from "@/components/Form/Form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>Plot Builder</h1>
        <h2>for Creative Minds</h2>
      </div>

      <Form />
    </main>
  );
}
