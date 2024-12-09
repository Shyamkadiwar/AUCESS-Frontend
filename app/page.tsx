import ChooseOptions from "@/components/landing/ChooseOptions";
import Foreground from "@/components/landing/Foreground";
import HeroComponent from "@/components/landing/HeroComponent";
import Pitch from "@/components/landing/Pitch";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (<>
    <Foreground />
    <div className="h-full relative overflow-hidden">
      <Navbar />
      <HeroComponent />
      <ChooseOptions />
      <Pitch />
    </div>
  </>
  );
}
