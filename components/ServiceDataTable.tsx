"use client";

import { toggleServiceAction } from "@/actions/toggleServiceAction";
import constants from "@/lib/constants";
import { Service, vehicleTypeValues } from "@/lib/db/schema/app";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@heroui/link";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { PencilIcon, ToggleLeft, ToggleRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ServiceForm({ services }: { services: Service[] }) {
  const router = useRouter();

  const columns = [
    {
      key: "name",
      label: "Nombre",
    },
  ]
    .concat(
      vehicleTypeValues.map((type) => ({
        key: type,
        label: constants.VEHICLE_TYPE_NAMES[type],
      })),
    )
    .concat({
      key: "actions",
      label: "Acciones",
    });

  const rows = services.map((service) => ({
    key: service.id,
    name: service.name,
    ...vehicleTypeValues.reduce(
      (acc, type) => ({
        ...acc,
        [type]: formatCurrency(service.prices[type] ?? 0),
      }),
      {},
    ),
    active: service.active,
    actions: (
      <div className="flex items-center justify-center gap-2">
        <Link href={`/dashboard/services/edit/${service.id}`}>
          <PencilIcon />
        </Link>
        <Link
          onClick={async () => {
            await toggleServiceAction({ id: service.id });
            router.refresh();
          }}
        >
          {service.active ? <ToggleRight className="text-green-500" /> : <ToggleLeft className="text-gray-400" />}
        </Link>
      </div>
    ),
  }));

  return (
    <Table aria-label="Tabla de servicios">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className={column.key === "name" ? "" : "text-center"}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className={columnKey === "name" ? (item.active ? "" : "line-through") : "text-center"}>
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
