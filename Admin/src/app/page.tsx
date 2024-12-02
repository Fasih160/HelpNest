import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {
  return (
    <div className="min-h-screen">
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  );
}
