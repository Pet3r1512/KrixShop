import Link from "next/link";

export default function EmptyProduct() {
  return (
    <div className="lg:my-16 px-4 lg:px-0">
      <p className="lg:text-3xl font-bold">
        Sorry, there are no products available in this category at the moment.
      </p>
      <p className="lg:text-xl">
        You might be interested in these related categories:{" "}
        <Link
          className="text-primary font-semibold"
          href={"/shop/Men/Casual-Shirts"}
        >
          Men - Casual Shrits
        </Link>
      </p>
    </div>
  );
}
