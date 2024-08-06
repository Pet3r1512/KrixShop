import Logo from "../Logo";
import NavBar from "@/components/Home/NavBar";
import Sidebar from "./Sidebar";
import CartButton from "@/components/Shop/Cart-button";

export default function Header() {
  return (
    <section className="flex items-center justify-between px-3.5 lg:px-0">
      <Sidebar />
      <Logo />
      <NavBar />
      <CartButton />
    </section>
  );
}
