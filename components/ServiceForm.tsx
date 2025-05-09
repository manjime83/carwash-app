"use client";

import { createServiceAction } from "@/actions/createServiceAction";
import { updateServiceAction } from "@/actions/updateServiceAction";
import constants from "@/lib/constants";
import { Service, vehicleTypeValues } from "@/lib/db/schema/app";
import { addToast, Button, Form, Input, NumberInput } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  prices: z.object({
    motorcycle: z.coerce.number().min(0),
    car: z.coerce.number().min(0),
    truck: z.coerce.number().min(0),
  }),
});

export default function ServiceForm({ service }: { service: Service | null }) {
  const router = useRouter();

  const [success] = useState("");
  const [error] = useState("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: service?.id,
      name: service?.name ?? "",
      prices: {
        motorcycle: service?.prices?.motorcycle ?? 0,
        car: service?.prices?.car ?? 0,
        truck: service?.prices?.truck ?? 0,
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const { id, ...fields } = data;

    if (id) {
      const result = await updateServiceAction({
        id,
        ...fields,
      });

      if (result) {
        router.push("/dashboard/services");
      } else {
        addToast({
          title: "Error al actualizar el servicio",
          description: "Por favor, intenta nuevamente.",
          color: "danger",
        });
      }
    } else {
      const result = await createServiceAction({
        ...fields,
      });

      if (result) {
        router.push("/dashboard/services");
      } else {
        addToast({
          title: "Error al crear el servicio",
          description: "Por favor, intenta nuevamente.",
          color: "danger",
        });
      }
    }
  });

  return (
    <Form onSubmit={handleSubmit} className="flex w-full flex-col items-stretch gap-4">
      <Controller
        control={form.control}
        name="name"
        rules={{ required: "El nombre es required." }}
        render={({ field, fieldState: { invalid, error }, formState: { isLoading } }) => (
          <Input
            label="Nombre"
            isRequired
            {...field}
            errorMessage={error?.message}
            isInvalid={invalid}
            placeholder="Lavado básico"
            disabled={isLoading}
          />
        )}
      />
      <div className="flex gap-4">
        {vehicleTypeValues.map((type) => (
          <Controller
            key={type}
            control={form.control}
            name={`prices.${type}`}
            rules={{
              required: `El precio para ${constants.VEHICLE_TYPE_NAMES[type]} es requerido.`,
              min: 0,
              max: 1000000,
            }}
            render={({ field: { onChange, ...field }, fieldState: { invalid, error }, formState: { isLoading } }) => (
              <NumberInput
                label={`Precio ${constants.VEHICLE_TYPE_NAMES[type]}`}
                isRequired
                {...field}
                onChange={(val) => {
                  const numericValue = Number(String(val).replace(/,/g, ""));
                  onChange(isNaN(numericValue) ? 0 : numericValue);
                }}
                errorMessage={error?.message}
                isInvalid={invalid}
                disabled={isLoading}
                min={0}
                max={1000000}
              />
            )}
          />
        ))}
      </div>
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
      {success && <div className="mb-2 text-sm text-green-600">{success}</div>}
      <Button
        type="submit"
        className="mt-2 w-full"
        isLoading={form.formState.isLoading}
        disabled={form.formState.isLoading}
      >
        {form.formState.isLoading ? "Sending..." : "Update Service"}
      </Button>
      {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
    </Form>
  );
}
