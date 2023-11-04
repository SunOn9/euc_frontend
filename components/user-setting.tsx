"use client";
import React from "react";
import { Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import UserCustom from "./user-custom";
import { navItem, siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

export default function UserSetting() {
  const router = useRouter();

  const onclick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: navItem
  ) => {
    e.preventDefault();
    router.push(item.href);
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown>
        <UserCustom name="Le Ho Phat Tai" description="lehophattai" />
        <DropdownMenu aria-label="Dynamic Actions" selectionMode="none">
          {siteConfig.navUserSettingItems.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                color={item.key === "logout" ? "danger" : "default"}
                className={item.key === "logout" ? "text-danger" : ""}
                onClick={(e) => onclick(e, item)}
              >
                {item.label}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
