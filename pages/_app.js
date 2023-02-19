import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Menus from "../components/menus";
import Header from "../components/header";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <div>
            <Header />
            <div className="flex w-screen h-screen relative">
              <Menus />
              <Component {...pageProps} />
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
