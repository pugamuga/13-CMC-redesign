import Document, {
  NextScript,
  Html,
  Main,
  Head,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import loader from "../components/loader";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="..//favicon.ico" />
          <style>{loader}</style>
        </Head>

        <body>
          <div id={"globalLoader"}>
            <div id={"globalDiv"}></div>
            <div />
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
