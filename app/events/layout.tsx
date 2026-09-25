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
            <section data-navbar-theme="light" className="flow-root bg-[#f8f9fa]">
                <Footer />
            </section>
        </>
    );
}
