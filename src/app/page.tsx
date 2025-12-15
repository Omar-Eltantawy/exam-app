import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-between flex-col h-screen pt-40">
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
    </div>
  );
}
