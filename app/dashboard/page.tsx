import { checkSession } from "@/lib/auth";

export default async function Dashboard() {
  const user = await checkSession();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
