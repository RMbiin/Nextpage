import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Main</div>
      <Link href={"/todo"}>Todo</Link>
    </>
  );
}
