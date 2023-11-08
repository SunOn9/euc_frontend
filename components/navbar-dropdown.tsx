"use client";
import { navItem } from "@/config/site";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link";

import { useRouter } from "next/navigation";
import { ChevronDown } from "./icons";

type Props = {
  item: navItem;
};

export default function NavBarDropDown(props: Props) {
  const router = useRouter();

  const onclick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: navItem
  ) => {
    e.preventDefault();
    router.push(item.href);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disableRipple
          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
          endContent={<ChevronDown fill="currentColor" size={16} />}
          radius="sm"
          variant="light"
        >
          {props.item.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" selectionMode="none">
        {props.item.children ? (
          props.item.children.map((item, index) => {
            return (
              <DropdownItem key={index} onClick={(e) => onclick(e, item)}>
                <NextLink href={item.href}>{item.label}</NextLink>
              </DropdownItem>
            );
          })
        ) : (
          <div></div>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
