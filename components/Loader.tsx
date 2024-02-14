import Image from "next/image";

function Loader() {
  return (
    <div className="h-full grid place-items-center">
      <Image
        src="/three-dots.svg"
        className="h-20 w-20"
        alt="loader"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Loader;
