import ChooseOptions from "@/components/landing/ChooseOptions";
import FAQs from "@/components/landing/Faq";
import Foreground from "@/components/landing/Foreground";
import HeroComponent from "@/components/landing/HeroComponent";
import HowItWorks from "@/components/landing/HowItWorks";
import LeaderBoard from "@/components/landing/LeaderBoard";
import Pitch from "@/components/landing/Pitch";
import Navbar from "@/components/Navbar";
import SmoothScrolling from "./SmoothScrolling";

export default function Home() {
  return (<>
    <Foreground />
    <div className="h-full relative overflow-hidden">
      <SmoothScrolling>
        <Navbar />
        <HeroComponent />
        {/* <ChooseOptions /> */}
        <Pitch />
        <LeaderBoard />
        <HowItWorks />
        <FAQs />
      </SmoothScrolling>
    </div>
  </>
  );
}
