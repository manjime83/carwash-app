"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Form, Input } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm({
    validators: {
      onChange: schema,
    },
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const { error } = await authClient.signIn.magicLink({
          email: value.email,
          callbackURL: "/dashboard",
        });

        if (error) {
          setError(error.message || "Failed to send magic link. Try again.");
        } else {
          setSuccess("A magic link has been sent to your email. Please check your inbox. You can close this page.");
          form.reset();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex w-full max-w-md flex-col items-center rounded-xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-indigo-700">Welcome Back</h1>
          <p className="text-gray-500">Sign in with your email to receive a magic link</p>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="w-full"
        >
          <form.Field name="email">
            {(field) => (
              <Input
                label="Email"
                type="email"
                isRequired
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errorMessage={field.state.meta.errors?.[0]?.message}
                isInvalid={field.state.meta.errors.length > 0}
                className="mb-4"
                placeholder="you@example.com"
                disabled={loading}
              />
            )}
          </form.Field>
          {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
          {success && <div className="mb-2 text-sm text-green-600">{success}</div>}
          <Button type="submit" className="mt-2 w-full" isLoading={loading} disabled={loading}>
            {loading ? "Sending..." : "Send Magic Link"}
          </Button>
        </Form>
        <div className="mt-6 text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} Carwash App</div>
      </div>
    </div>
  );
}
