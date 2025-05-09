import ServiceDataTable from "@/components/ServiceDataTable";
import { auth } from "@/lib/auth";
import { DAL } from "@/lib/db/dal";
import { Link } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ServicesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const services = await DAL.query.getServices();

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-2xl font-bold">Servicios</h1>
          <p className="text-muted-foreground text-sm">Gestiona los servicios que ofreces a tus clientes.</p>
        </div>
        <Link href="/dashboard/services/edit" color="primary">
          <PlusIcon size={20} /> Agregar servicio
        </Link>
      </div>
      <ServiceDataTable services={services} />
    </div>
  );
}
