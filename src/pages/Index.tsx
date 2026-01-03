import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RemoteSupport from "@/components/RemoteSupport";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <RemoteSupport />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
