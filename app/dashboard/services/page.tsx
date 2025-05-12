import PageContainer from "@/components/nimbus/PageContainer";
import ServiceDataTable from "@/components/ServiceDataTable";
import { checkSession } from "@/lib/auth";
import { DAL } from "@/lib/db/dal";
import { Link } from "@heroui/link";
import { PlusIcon } from "lucide-react";

export default async function ServicesPage() {
  await checkSession();

  const services = await DAL.query.getServices();

  return (
    <PageContainer
      title="Servicios"
      description="Gestiona los servicios que ofreces a tus clientes."
      actions={
        <Link href="/dashboard/services/edit" color="primary">
          <PlusIcon size={20} /> Agregar servicio
        </Link>
      }
    >
      <ServiceDataTable services={services} />
    </PageContainer>
  );
}
