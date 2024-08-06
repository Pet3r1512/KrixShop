import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function FooterMain() {
  const infos = [
    {
      key: "Phone Number",
      icon: <Phone />,
      desc: "(028) 760 8248",
    },
    {
      key: "Email",
      icon: <Mail />,
      desc: "krist.customer.services@mail.com",
    },
    {
      key: "Address",
      icon: <MapPin />,
      desc: "73 Lê Văn Sỹ, p13, Phú Nhuận, Tp.HCM",
    },
  ];

  return (
    <div className="lg:flex lg:justify-between lg:w-1/3">
      <div className="flex flex-col gap-y-8 lg:gap-y-14">
        <div className="h-12 lg:h-16">
          <Image
            src={"/images/LogoWhite.png"}
            alt=""
            width={1000}
            height={1000}
            priority
            className="h-full w-auto"
          />
        </div>
        <div className="flex flex-col gap-y-2.5">
          {infos.map((info) => {
            return (
              <div key={info.key} className="flex items-center gap-x-2">
                {info.icon}
                <p className="font-medium lg:font-semibold">{info.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
