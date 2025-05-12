interface PageProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageContainer({ title, description, actions, children }: PageProps) {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
