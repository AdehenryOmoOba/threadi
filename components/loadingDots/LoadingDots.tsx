import styles from "./style.module.css"


function LoadingDots() {
  return (<div className={styles.spinner}>
           <div className={styles.bounce1} />
           <div className={styles.bounce2} />
           <div className={styles.bounce3} />
        </div>)
}

export default LoadingDots