import { Contained } from "@/components/Contained";
import Link from "next/link";
async function NotFoundPage() {
  return (
    <Contained className="flex flex-grow flex-col items-center justify-center gap-2">
      <Link href="/" className="btn btn-ghost">
        Go to home
      </Link>
    </Contained>
  );
}

export default NotFoundPage;
