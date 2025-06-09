import React from "react";
import styles from "./Loader.module.css";
import Image from "next/image";

const Loader = () => (
  <div className={styles.loaderOverlay}>
    <div className={styles.pulseWrapper}>
      <div className={styles.spinnerWithImage}>
      <div className={styles.pulseGlow}></div>
        <Image src="/images/logo_spinner.png" alt="Logo" width={56} height={56} className={styles.loaderImage} />
        <div className={styles.eclipseSpinner}></div>
      </div>
    </div>
  </div>
);

export default Loader;