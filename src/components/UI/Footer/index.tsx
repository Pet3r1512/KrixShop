import FooterMain from "./Main";
import SectionNav from "./Main/sections";
import Subscribe from "./Main/subscribe";
import PaymentAndSocial from "./Payment-and-Socials";

export default function Footer() {
  return (
    <div className="bg-[#0c0f0a] text-white">
      <section className="max-w-7xl mx-auto px-5 md:px-10 pt-6 pb-10 lg:px-0 lg:py-16 flex flex-col gap-y-6">
        <main className="flex md:justify-between flex-col justify-center gap-y-12 md:flex-row md:flex-wrap lg:h-full">
          <FooterMain />
          <SectionNav />
          <Subscribe />
        </main>
        <hr className="bg-white" />
        <PaymentAndSocial />
      </section>
    </div>
  );
}
