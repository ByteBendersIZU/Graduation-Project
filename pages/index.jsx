import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const pushLogIn = () => {
    router.push("/account/signin");
  };
  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <div>Logo</div>
        <button className={styles.btn} onClick={pushLogIn}>
          Giris Yap
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.first}>
          <h2 className={styles.h2}>
            Buyumek isteyen sirketlerin 1. numarali tercihi
          </h2>
          <p>
            Sirketinizi daha kolay sekilde takip etmek ve yonetmek mi
            istiyorsunuz?
          </p>
          <button className={styles.btn}>Ucretsiz Dene</button>
        </div>
      </div>
      <div className={styles.footer}>
        <div>Iletisim Bilgileri</div>
        <div>Odeme Yontemleri</div>
      </div>
    </div>
  );
}
