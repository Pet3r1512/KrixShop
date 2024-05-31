import Payment from "./payment";
import SocialMedia from "./social_media";

export default function PaymentAndSocial() {
  return (
    <div className="flex md:items-center w-full md:justify-between flex-col md:flex-row items-center gap-y-8">
      <Payment />
      <p className="md:w-1/3 text-center font-semibold md:text-lg hidden md:block">
        {"©2024 Krist - All rights reserved"}
      </p>
      <SocialMedia />
      <p className="text-center md:hidden">
        {"©2024 Krist - All rights reserved"}
      </p>
    </div>
  );
}
