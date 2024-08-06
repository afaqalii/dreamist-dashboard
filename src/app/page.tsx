import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen grid place-content-center">
      <div>
        <h1 className="text-2xl mb-4 text-black font-semibold tracking-tighter">Go to dashboard</h1>
        <Link className="grid place-content-center" href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
