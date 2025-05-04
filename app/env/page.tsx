export default function EnvPage() {
  return (
    <div>
      <pre>{JSON.stringify(process.env, null, 2)}</pre>
    </div>
  );
}
