import Logo from "../Logo";
import NavBar from "@/components/Home/NavBar";

export default function Header() {
  return (
    <section className="flex items-center justify-between">
      <Logo />
      <NavBar />
      <div className="w-[30%]"></div>
    </section>
  );
}
