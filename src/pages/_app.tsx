import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CookiesProvider } from "react-cookie";
import { trpc } from "../server/utils/tRPC";

function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

const TranslatedApp = appWithTranslation(App);

export default trpc.withTRPC(TranslatedApp);
