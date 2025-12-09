import NavbarWrapper from "@/components/navbar-wrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavbarWrapper />
            <main>{children}</main>
        </>
    );
}
