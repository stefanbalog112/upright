import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Audience } from "@/components/sections/Audience";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Calculator } from "@/components/sections/Calculator";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="obsah">
        <Hero />
        <Intro />
        <Services />
        <Audience />
        <Work />
        <Process />
        <Pricing />
        <Calculator />
        <WhyUs />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
