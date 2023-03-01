import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Header from "../components/header";
import Layout from "../components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <div className="flex">
            <Layout />
            <div className="w-screen h-screen relative">
              <Header />
              <div className="p-8 bg-bgMain h-main overflow-scroll dark:bg-darkBg dark:text-white">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <></>;
  }

  return children;
}
