export default async function SandboxPage() {
  return (
    <div>
      <pre>{JSON.stringify(process.env, null, 2)}</pre>
    </div>
  );
}
