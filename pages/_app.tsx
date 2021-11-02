import "@/css/global/Global.css";

// Colors
import "@/css/global/colors/ColorVariables.css";
import "@/css/global/colors/BackgroundColorClasses.css";
import "@/css/global/colors/ColorClasses.css";

// Fonts
import "@/css/global/fonts/FontVariables.css";
import "@/css/global/fonts/FontClasses.css";

import Head from "next/head";

import { AppProps } from "next/app";

const META_DESCRIPTION =
  "A tool for easily finding Solana PDAs (program derived addresses). In other words, a PDA calculator!";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Solana PDA Finder</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤔</text></svg>"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
