import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import theme from '../components/chakraTheme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
          <script
            async
            defer
            src="https://stats.juke.fr/umami.js"
            data-website-id="d527789c-8332-4b02-906c-9d629eb9e187"
            data-do-not-track="true"
          ></script>
        </body>
      </Html>
    );
  }
}
