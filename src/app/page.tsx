import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import DesignShowcase from "@/components/design-showcase";
import Stats from "@/components/stats";
import Process from "@/components/process";
import Faq from "@/components/faq";
import TrustBar from "@/components/trust-bar";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <DesignShowcase />
      <Stats />
      <Process />
      <Faq />
      <TrustBar />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
