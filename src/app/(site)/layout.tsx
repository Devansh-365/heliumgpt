import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="relative flex h-full text-white overflow-clip">
        <Sidebar />
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
}
