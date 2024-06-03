import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../UI/ui/aceternity/3d-card";
import Image from "next/image";

export default function CategoryCard({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: number;
}) {
  return (
    <CardContainer key={id} className="inter-var">
      <CardBody className="bg-gray relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-[300px] lg:h-[500px] max-w-[185px] w-auto lg:max-w-[350px] rounded-xl border overflow-hidden">
        <p className="font-bold text-primary absolute md:top-5 lg:top-10 left-[80px] text-3xl lg:text-[120px] opacity-60">
          KRIST
        </p>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image}
            height={1000}
            width={1000}
            quality={50}
            priority
            className="w-auto mx-auto min-h-full object-cover rounded-xl"
            alt="thumbnail"
          />
        </CardItem>
        <Link
          href={`/shop/${name.toLowerCase().split("-")[0]}/${
            name.toLowerCase().split("-")[1]
          }`}
          className="flex justify-center absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 w-4/5 bg-white text-black font-semibold lg:font-bold text-base lg:text-2xl shadow-2xl px-2 pb-1.5 pt-1 lg:px-2.5 lg:pb-2 lg:pt-1.5 rounded-lg"
        >
          {name}
        </Link>
      </CardBody>
    </CardContainer>
  );
}
