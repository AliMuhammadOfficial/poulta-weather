import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/contact"}>Contact Us</Link>
      <div className="flex justify-center">
        <Link href={"/dashboard"} className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow-sm">Dashboard</Link>
      </div>
    </main>
  );
}
