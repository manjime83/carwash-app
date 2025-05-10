"use client";

import { authClient } from "@/lib/auth-client";
import constants from "@/lib/constants";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import type { NavbarProps } from "@heroui/navbar";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { cn } from "@heroui/theme";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AppIcon from "./AppIcon";

const menuItems = { washes: "Lavados", clients: "Clientes", services: "Servicios" };

export default function TopMenu(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });

  return (
    <Navbar
      {...props}
      classNames={{
        base: cn("border-default-100", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center",
        item: "hidden md:flex",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Content */}
      <NavbarBrand>
        <div className="bg-foreground text-background rounded-full">
          <AppIcon size={34} />
        </div>
        <span className="text-small ml-2 font-medium">{constants.APP_NAME}</span>
      </NavbarBrand>

      {/* Center Content */}
      <NavbarContent justify="center">
        <NavbarItem isActive={pathname === `/dashboard`}>
          <Link
            aria-current={pathname === `/dashboard` ? "page" : undefined}
            color="foreground"
            href="/dashboard"
            size="sm"
          >
            Home
          </Link>
        </NavbarItem>
        {Object.entries(menuItems).map(([key, value]) => (
          <NavbarItem key={key} isActive={pathname === `/dashboard/${key}`}>
            <Link
              aria-current={pathname === `/dashboard/${key}` ? "page" : undefined}
              color="foreground"
              href={`/dashboard/${key}`}
              size="sm"
            >
              {value}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="ml-2 !flex gap-2">
          <Button className="text-default-500" radius="full" variant="light" onPress={handleLogout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="bg-default-200/50 shadow-medium dark:bg-default-100/50 top-[calc(var(--navbar-height)_-_1px)] max-h-fit pt-6 pb-6 backdrop-blur-md backdrop-saturate-150">
        <NavbarMenuItem>
          <Button fullWidth as={Link} href="/#" variant="faded" onPress={handleLogout}>
            Logout
          </Button>
        </NavbarMenuItem>

        {Object.entries(menuItems).map(([key, value]) => (
          <NavbarMenuItem key={key}>
            <Link className="text-default-500 mb-2 w-full" href={`/dashboard/${key}`} size="md">
              {value}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
