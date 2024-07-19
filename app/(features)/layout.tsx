import Sidebar from "../components/layout/sidebar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <Sidebar />
            <div>{children}</div>
        </div>
    )
}