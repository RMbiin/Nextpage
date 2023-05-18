import Seo from "@/components/common/Seo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Seo title={`Main`} />
      <Link href={"/todo"}>Todo</Link>
    </>
  );
}
