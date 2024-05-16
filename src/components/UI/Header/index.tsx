import Logo from "../Logo";
import NavBar from "@/components/Home/NavBar";
import LangChange from "./Lang-change";

export default function Header() {
  return (
    <section className="flex items-center justify-between">
      <Logo />
      <NavBar />
      <LangChange />
    </section>
  );
}
