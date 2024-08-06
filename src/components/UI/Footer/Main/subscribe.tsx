import LangChange from "../../Header/Lang-change";
import { PlaceholdersAndVanishInput } from "../../ui/aceternity/placeholders-and-vanish-input";

export default function Subscribe() {
  const placeholders = [
    "Your email address goes here",
    "Get news from us",
    "Notify for new releases",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="sm:w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-y-5 justify-between relative">
      <div className="flex flex-col gap-y-3.5">
        <p className="font-bold text-xl">Subscribe</p>
        <p>
          Enter your email to be the first to know about new collections and
          product launches.
        </p>
        <div className="size-fit bg-white rounded-full">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <LangChange />
    </div>
  );
}
