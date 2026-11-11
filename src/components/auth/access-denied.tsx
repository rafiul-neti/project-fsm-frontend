import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDeined() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex items-center gap-3">
        <div className="bg-red-200 rounded-full p-5">
          <ShieldAlert size={45} className="text-red-500" />
        </div>
        <div className="">
          <h1 className="text-lg font-semibold">You do not have access to this page.</h1>
          <p>
            Go back to <Link href={`/`} className="text-primary underline">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
