import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Menus from "../components/menus";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Menus />
          <Component {...pageProps} />
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
