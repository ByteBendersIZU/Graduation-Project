import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Header from "../components/header";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ToastContainer position="bottom-right" />
        {Component.auth ? (
          <Auth>
            <div className="flex">
              <Layout />
              <div className="w-screen h-screen relative">
                <Header />
                <div className="p-8 bg-bgMain h-main  dark:bg-darkBg dark:text-white overflow-x-hidden">
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </Provider>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <></>;
  }

  return children;
}
