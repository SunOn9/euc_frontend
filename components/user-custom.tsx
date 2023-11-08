import { Avatar, AvatarIcon, DropdownTrigger, Button } from "@nextui-org/react";

type Props = {
  name: string;
  description: string;
};

export default function UserCustom(props: Props) {
  return (
    <DropdownTrigger>
      <Button variant="light" disableAnimation className="flex items-center">
        <Avatar
          size="sm"
          icon={<AvatarIcon />}
          classNames={{
            base: "bg-gradient-to-br from-[#FF705B] to-[#FFB457]",
            icon: "text-black/80",
          }}
        />
        <div>
          <div className="text-left w-full md:w-1/2 ml-1 text-xs lg:text-sm text-default-600 block max-w-full">
            {props.name}
          </div>
          <div className="text-left w-full md:w-1/2 ml-1 text-sxs lg:text-xs text-default-500 block max-w-full">
            {props.description}
          </div>
        </div>
      </Button>
    </DropdownTrigger>
  );
}
