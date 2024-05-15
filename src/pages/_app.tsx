import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

const TranslatedApp = appWithTranslation(App);

export default TranslatedApp;
