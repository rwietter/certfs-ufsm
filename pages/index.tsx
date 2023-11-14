import { Header } from "lib/components/header";
import { Menu } from "lib/components/menu/menu";
import { Layout } from "lib/ui/layout";
import RegisterForm from "domains/register/form";

export default function Page(): JSX.Element {
  return (
    <Layout>
      <Header />
      <Menu />
      <section className="flex items-start justify-start w-full max-w-7xl py-2 px-6 mx-auto">
        <RegisterForm />
      </section>
    </Layout>
  );
}
