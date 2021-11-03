import ResponsiveContainer from "src/components/ResponsiveContainer";
import styles from "@/css/pages/Resources.module.css";
import Body1 from "src/components/text/Body1";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import ContainerOuter from "src/components/containers/ContainerOuter";
import HeaderAndDescriptions from "src/components/common/HeaderAndDescriptions";
import HeadContainer from "src/components/containers/HeadContainer";

function Resource({
  description,
  href,
  name,
}: {
  description: string;
  href: string;
  name: string;
}) {
  return (
    <>
      <Body1>
        <a href={href}>{name}</a>
      </Body1>
      <Body1>{description}</Body1>
    </>
  );
}

function Resources() {
  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Resources 😍</>}
            description="A list of other useful tools and resources."
            help={[
              <>
                <a href="https://twitter.com/pencilflip">Lmk</a> if there&apos;s
                anything you think I should add!
              </>,
            ]}
          />
          <div className={styles.resources}>
            <Resource
              description="Lets you look up token metadata by mint address or token symbol."
              href="https://naming.bonfida.org/#/token"
              name="Bonfida token registry"
            />
          </div>
        </div>
      </ResponsiveContainer>
      <Footer />
    </ContainerOuter>
  );
}

export default HeadContainer(
  Resources,
  "A list of useful Solana tools and resources"
);
