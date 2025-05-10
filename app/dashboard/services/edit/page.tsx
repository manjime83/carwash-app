import ServiceForm from "@/components/ServiceForm";
import { checkSession } from "@/lib/auth";
import { Link } from "@heroui/react";
import { ArrowLeftIcon } from "lucide-react";

export default async function AddServicePage() {
  await checkSession();

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-2xl font-bold">Agregar Servicio</h1>
          <p className="text-muted-foreground text-sm">
            Asigna los precios para cada tipo de vehículo. Si no tiene precio, asigna 0.
          </p>
        </div>
        <Link href="/dashboard/services" className="text-muted-foreground flex items-center gap-1" size="sm">
          <ArrowLeftIcon size={16} /> Cancelar
        </Link>
      </div>
      <ServiceForm service={null} />
    </div>
  );
}
