"use client";
import { navItem } from "@/config/site";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import NextLink from "next/link";

import { useRouter } from "next/navigation";

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
        <NextLink href="" className="flex items-center">
          {props.item.label}
        </NextLink>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" selectionMode="none">
        {props.item.children ? (
          props.item.children.map((item, index) => {
            return (
              <DropdownItem key={index} onClick={(e) => onclick(e, item)}>
                {item.label}
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
