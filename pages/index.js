import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <button
        className="text-red-700"
        onClick={() => router.push(`/account/login`)}
      >
        Giriş Yap
      </button>
    </>
  );
}
