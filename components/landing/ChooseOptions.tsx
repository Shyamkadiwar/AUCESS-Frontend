import { CircleArrowRight } from 'lucide-react'

const ChooseOptions = () => {
  const optionDetails = [{
    Title: "Join The Contest",
    icon: "something",
    middle: false
  },
  {
    Title: "Join The Contest",
    icon: "something",
    middle: true
  },
  {
    Title: "Join The Contest",
    icon: "something",
    middle: false
  }]

  return (
    <div className="w-full h-full flex flex-col relative justify-center items-center my-52">
        <div className='flex flex-col text-center text-5xl relative font-neue-ultraBold py-20'>
          Participate Now!
        </div>
      <div className="flex flex-col w-full max-w-6xl items-center justify-center relative">
      <div className='inset-0 absolute bg-azure-radiance-800 blur-xl '></div>
        <div className="flex flex-row w-full rounded-3xl dark:bg-[#1c3149] bg-azure-radiance-50 relative border-2 border-azure-radiance-500 z-30">
          <div className="flex flex-col w-full max-w-sm rounded-tl-3xl rounded-bl-3xl bg-[#111F2A] md:p-8 p-4 justify-center items-center">
            <h1 className=" dark:text-white font-neue-ultraBold text-4xl text-center">Choose Your Option</h1>
            <h3 className=" dark:text-white font-neue-medium text-lg py-4 text-center">Be Wise Choose Wise!</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseOptions;