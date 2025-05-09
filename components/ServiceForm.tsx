"use client";

import { createServiceAction } from "@/actions/createServiceAction";
import { updateServiceAction } from "@/actions/updateServiceAction";
import constants from "@/lib/constants";
import { Service, vehicleTypeValues } from "@/lib/db/schema/app";
import { addToast, Button, Form, Input, NumberInput } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
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

  const form = useForm({
    validators: {
      onChange: schema,
    },
    defaultValues: {
      id: service?.id,
      name: service?.name ?? "",
      prices: {
        motorcycle: service?.prices?.motorcycle ?? 0,
        car: service?.prices?.car ?? 0,
        truck: service?.prices?.truck ?? 0,
      },
    },
    onSubmit: async ({ value }) => {
      const { id, ...fields } = value;

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
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex w-full flex-col items-stretch gap-4"
    >
      <form.Field name="name">
        {(field) => (
          <Input
            label="Nombre"
            isRequired
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors?.[0]?.message}
            isInvalid={field.state.meta.errors.length > 0}
            placeholder="Lavado básico"
            disabled={form.state.isSubmitting}
          />
        )}
      </form.Field>

      <div className="flex gap-4">
        {vehicleTypeValues.map((type) => (
          <form.Field key={type} name={`prices.${type}`}>
            {(field) => (
              <NumberInput
                label={`Precio ${constants.VEHICLE_TYPE_NAMES[type]}`}
                isRequired
                value={field.state.value}
                onChange={(val) => {
                  const numericValue = Number(String(val).replace(/,/g, ""));
                  field.handleChange(isNaN(numericValue) ? 0 : numericValue);
                }}
                onBlur={field.handleBlur}
                errorMessage={field.state.meta.errors?.[0]?.message}
                isInvalid={field.state.meta.errors.length > 0}
                disabled={form.state.isSubmitting}
                min={0}
                max={1000000}
              />
            )}
          </form.Field>
        ))}
      </div>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
      {success && <div className="mb-2 text-sm text-green-600">{success}</div>}

      <Button
        type="submit"
        className="mt-2 w-full"
        isLoading={form.state.isSubmitting}
        disabled={form.state.isSubmitting}
      >
        {form.state.isSubmitting ? "Enviando..." : service ? "Actualizar Servicio" : "Crear Servicio"}
      </Button>
    </Form>
  );
}
