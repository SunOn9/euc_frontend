import { title, subtitle } from "@/components/primitives";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  // const handleCheckAuth = () => {};

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "yellow" })}>Entixie&nbsp;</h1>
        <h1 className={title()}>Ultimate Club&nbsp;</h1>
        <h2 className={subtitle({ class: "mt-4" })}></h2>
      </div>
    </section>
  );
}
