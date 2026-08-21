import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import EasterEgg from "@/components/EasterEgg";
import ScrollReset from "@/components/ui/ScrollReset";

export default function Home() {
  return (
    <>
      <ScrollReset />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <EasterEgg />
    </>
  );
}
