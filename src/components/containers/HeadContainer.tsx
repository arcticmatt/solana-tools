import Head from "next/head";

export default function HeadContainer<Props>(
  ComponentToWrap: any,
  description: string
): (props: Props) => JSX.Element {
  return function Page(props: Props) {
    return (
      <>
        <Head>
          <meta key="description" name="description" content={description} />
        </Head>
        <ComponentToWrap {...props} />
      </>
    );
  };
}
