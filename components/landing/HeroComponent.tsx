import Image from "next/image";
import trophy from './assets/stock-vector-first-prize-gold-trophy-icon-prize-gold-trophy-winner-first-prize-vector-illustration-and-icon-1533451133-transformed-removebg-preview.png'
import { Button } from "../ui/button";

const HeroComponent = () => {
  return <div className="w-full relative h-full flex flex-col items-center px-4 z-30 py-24">
    <div className="w-full max-w-7xl justify-center flex flex-row items-center">
      <div className="flex flex-col w-full md:w-2/3 text-center md:text-left gap-6">
        <div className="flex flex-col w-full">
          <h1 className="w-full lg:text-7xl md:text-6xl text-3xl font-neue-bold ">Test Your Knowledge, Win Big!</h1>
          <h3 className="w-full max-w-3xl lg:text-lg md:text-md text-sm font-neue-regular">Join thousands of quiz enthusiasts and compete for cash prizes in various academic domains.</h3>
        </div>
        <div className="flex flex-row gap-1 md:gap-4 justify-center md:justify-start">
          <Button>Join Now</Button>
          <Button variant={'outline'}>Explore More</Button>
        </div>
      </div>
      <div className="hidden md:flex w-2/5 bg-clip-content">
        <Image src={trophy} height={800} width={800} alt="trophy" />
      </div>
    </div>
  </div>
}

export default HeroComponent;