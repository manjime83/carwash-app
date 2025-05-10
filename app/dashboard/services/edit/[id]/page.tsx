import ServiceForm from "@/components/ServiceForm";
import { checkSession } from "@/lib/auth";
import { DAL } from "@/lib/db/dal";
import { Link } from "@heroui/react";
import { ArrowLeftIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await checkSession();

  const { id } = await params;
  const service = await DAL.query.getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-col items-start justify-between">
          <h1 className="text-2xl font-bold">Editar Servicio</h1>
          <p className="text-muted-foreground text-sm">
            Asigna los precios para cada tipo de vehículo. Si no tiene precio, asigna 0.
          </p>
        </div>
        <Link href="/dashboard/services" className="text-muted-foreground flex items-center gap-1" size="sm">
          <ArrowLeftIcon size={16} /> Cancelar
        </Link>
      </div>
      <ServiceForm service={service} />
    </div>
  );
}
