import styles from "./plotbox.module.scss";

interface StoryProps {
  story: string,
}

export default function PlotBox(props: StoryProps) {

  const { story } = props;

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.storyContainer}>{story}</div>
      </div>
      <button onClick={refresh}>Generate again</button>
    </>
  );
}
