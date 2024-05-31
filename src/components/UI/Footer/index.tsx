import FooterMain from "./Main";
import SectionNav from "./Main/sections";
import Subscribe from "./Main/subscribe";

export default function Footer() {
  return (
    <section className="bg-[#0c0f0a] text-white px-5 md:px-10 pt-6 pb-10 lg:px-0 lg:py-16 flex items-center">
      <main className="max-w-7xl mx-auto flex md:justify-between flex-col justify-center gap-y-12 md:flex-row md:flex-wrap lg:h-full">
        <FooterMain />
        <SectionNav />
        <Subscribe />
      </main>
    </section>
  );
}
