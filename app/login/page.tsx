import { title } from "@/components/primitives";
import LoginForm from "./_component/login-form";

export default function Login() {
  return (
    <section className="h-full		 flex flex-col items-center content-evenly	 justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "yellow" })}>Entixie&nbsp;</h1>
        <h1 className={title()}>Ultimate Club&nbsp;</h1>
      </div>
      <LoginForm />
    </section>
  );
}
