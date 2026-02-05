import Image from "next/image";

export default function NotFound() {
  return (
    <div className="container py-30 text-center flex flex-col items-center gap-4">
      <Image
        src="/assets/images/not-found.svg"
        alt="Not Found"
        width={125}
        height={125}
      />
      <h1 className="text-2xl font-bold">Profile Not Found</h1>
      <p className="text-muted-foreground">
        This user does not exist.
      </p>
    </div>
  );
}
