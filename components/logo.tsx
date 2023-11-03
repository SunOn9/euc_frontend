import { Image } from "@nextui-org/image";

type Props = {
  width: number;
};

export default function Logo(props: Props) {
  return (
    <Image
      width={props.width}
      alt="Logo Entixie Ultimate Club"
      src="/icon-1.png"
    />
  );
}
