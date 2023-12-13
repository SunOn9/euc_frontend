"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
// import { title } from "@/components/primitives";
import UserSetting from "./user-setting";
import Logo from "./logo";
import NavBarDropDown from "./navbar-dropdown";
import { User } from "@/generated/user/user";
import { useEffect, useState } from "react";
import { EnumProto_UserRole } from "@/generated/enumps";

export const Navbar = () => {
  const [userInfo, setUserInfo] = useState(User.create());

  const mergeNav = siteConfig.navItems.concat(siteConfig.navUserSettingItems);

  useEffect(() => {
    const item: User = JSON.parse(localStorage.getItem("user-info") ?? "");
    if (item) {
      setUserInfo(item);
    }
  }, []);

  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/dashboard"
          >
            <Logo width={60} />
            {/* <p
              className={clsx(
                title({ color: "yellow", size: "md" }),
                "font-bold text-inherit"
              )}
            >
              EUC
            </p> */}
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => {
            let res = false;

            switch (item.key) {
              case "user": {
                if (
                  userInfo.role !== EnumProto_UserRole.ADMIN &&
                  userInfo.role !== EnumProto_UserRole.STAFF
                ) {
                  res = true;
                }
                break;
              }
              case "club": {
                if (
                  userInfo.role !== EnumProto_UserRole.ADMIN &&
                  userInfo.role !== EnumProto_UserRole.STAFF
                ) {
                  res = true;
                }
                break;
              }
              case "area": {
                if (
                  userInfo.role !== EnumProto_UserRole.ADMIN &&
                  userInfo.role !== EnumProto_UserRole.STAFF
                ) {
                  res = true;
                }
                break;
              }

              case "payment": {
                if (
                  userInfo.role !== EnumProto_UserRole.ADMIN &&
                  userInfo.role !== EnumProto_UserRole.TREASURER
                ) {
                  res = true;
                }
                break;
              }

              case "receipt": {
                if (
                  userInfo.role !== EnumProto_UserRole.ADMIN &&
                  userInfo.role !== EnumProto_UserRole.TREASURER
                ) {
                  res = true;
                }
                break;
              }
              default: {
                break;
              }
            }

            if (res) {
              return null;
            } else {
              return item.children ? (
                <NavBarDropDown key={item.key} item={item} />
              ) : (
                <NextLink
                  key={item.key}
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                    "text-sm"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              );
            }
          })}
        </ul>
      </NavbarContent>
      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2 space-x-1">
          <ThemeSwitch />
          <Link
            isExternal
            href={siteConfig.links.facebook}
            aria-label="Facebook"
          >
            <FacebookIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.instagram}
            aria-label="Instagram"
          >
            <InstagramIcon className="text-default-500" />
          </Link>
          <UserSetting name={userInfo.name} email={userInfo.email} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {mergeNav.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                color={item.key === "logout" ? "danger" : "foreground"}
                className={item.key === "logout" ? "text-danger" : ""}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
