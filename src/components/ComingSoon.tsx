import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="container py-30 text-center flex flex-col items-center gap-4">
      <Image
        src="/assets/images/coming-soon.svg"
        alt="Not Found"
        width={125}
        height={125}
      />
      <h1 className="text-2xl font-bold mt-7">Coming Soon</h1>
      {/* <p className="text-muted-foreground">
        Coming soon
      </p> */}
    </div>
  );
}
