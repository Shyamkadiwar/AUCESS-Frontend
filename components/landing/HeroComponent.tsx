import Image from "next/image";
import trophy from './assets/gold-trophy-with-name-plate-winner-competition_68708-545-removebg-preview (1).png'
import { Button } from "../ui/button";

const HeroComponent = () => {
  return <div className="w-full relative h-full min-h-screen flex flex-col items-center px-4 z-30 pt-48 pb-20">
    <div className="w-full max-w-7xl justify-center flex flex-row items-center">
      <div className="flex flex-col w-full md:w-2/3 text-center md:text-left gap-6">
        <div className="flex flex-col w-full justify-center">
          <h1 className="w-full lg:text-7xl md:text-6xl text-3xl font-neue-ultraBold ">Test Your Knowledge, Win Big!</h1>
          <h3 className="w-full max-w-3xl lg:text-lg md:text-md text-sm font-neue-regular">Join thousands of quiz enthusiasts and compete for cash prizes in various academic domains.</h3>
        </div>
        <div className="flex flex-row gap-1 md:gap-4 justify-center md:justify-start">
          <Button className="px-8 py-4 text-lg font-bold">Join Now</Button>
          <Button variant={'outline'}>Explore More</Button>
        </div>
      </div>
      <div className="hidden md:flex">
        <Image src={trophy} alt="trophy" className="h-[300px] w-[300px]" />
      </div>
    </div>
  </div>
}

export default HeroComponent;