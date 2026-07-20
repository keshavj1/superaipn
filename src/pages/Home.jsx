import HeroSection from "../components/Herosection";
import GalaxyEffect1 from "../components/GalaxyEffect1";
import VideoShowcase from "../components/VideoShowcase";
import AIEcosystem from "../components/AIEcosystem";
import ProvenTraction from "../components/ProvenTraction";
import KeyMilestones from "../components/KeyMilestones";
import WhySuperAIP from "../components/WhySuperAIP";
// import Pricing from "../components/Pricing";
import ClientsSection from "../components/ClientsSection";
import FAQSection from "../components/FAQSection";
import FinalCTA from "../components/FinalCTA";

function Home() {
  return (
    <>
      <HeroSection />
      <GalaxyEffect1 />

      <VideoShowcase />
      <AIEcosystem />
      <ProvenTraction />
      <KeyMilestones />
      <WhySuperAIP />
      {/* <Pricing /> */}
      {/* Re-enabled: the three invented endorsements this shipped with have
          been replaced by real, attributable partner quotes. */}
      <ClientsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

export default Home;
