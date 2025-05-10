import { Link } from "@heroui/link";

export default function Home() {
  return (
    <div>
      <Link href="/login" className="animate-pulse">
        Login
      </Link>
    </div>
  );
}
