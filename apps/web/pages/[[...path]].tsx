import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("../src/next/ClientApp"), {
  ssr: false
});

export default function WebAppPage() {
  return <ClientApp />;
}
