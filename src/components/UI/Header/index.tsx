import Logo from "../Logo";
import NavBar from "@/components/Home/NavBar";
import LangChange from "./Lang-change";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <section className="flex items-center justify-between px-3.5 lg:px-0">
      <Sidebar />
      <Logo />
      <NavBar />
      <LangChange />
    </section>
  );
}
