import Link from "next/link";

export default function SectionNav() {
  const information = [
    {
      name: "My Account",
      href: "",
    },
    {
      name: "LogIn",
      href: "",
    },
    {
      name: "My Cart",
      href: "",
    },
  ];

  const services = [
    {
      name: "About Us",
      href: "",
    },
    {
      name: "Delivery Information",
      href: "",
    },
    {
      name: "Privacy Policy",
      href: "",
    },
    {
      name: "Terms & Conditions",
      href: "",
    },
  ];

  return (
    <div className="flex lg:gap-x-16 gap-x-8 lg:w-1/3">
      <div>
        <p className="font-bold text-xl">Information</p>
        <ul className="flex flex-col gap-y-2 mt-3">
          {information.map((info) => {
            return (
              <li
                key={info.name}
                className="lg:hover:text-primary duration-75 ease-in-out"
              >
                <Link href={info.href}>{info.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="font-bold text-xl">Services</p>
        <ul className="flex flex-col gap-y-2 mt-3">
          {services.map((service) => {
            return (
              <li
                key={service.name}
                className="lg:hover:text-primary duration-75 ease-in-out"
              >
                <Link href={service.href}>{service.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
