import { Header } from "lib/components/header";
import { Menu } from "lib/components/menu/menu";
import { Layout } from "lib/ui/layout";
import Search from "domains/search/search";

export default function Page(): JSX.Element {
  return (
    <Layout>
      <Header />
      <Menu />
      <Search />
    </Layout>
  );
}
