import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";

export default function EventsPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <section data-navbar-theme="light">
                <Footer />
            </section>
        </>
    );
}
