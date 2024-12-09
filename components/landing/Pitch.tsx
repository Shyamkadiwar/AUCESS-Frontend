import thinking from './assets/Questions-cuate.svg'
import money from './assets/Finance-cuate.svg'
import reading from './assets/Notebook-cuate.svg'
import Image from 'next/image'

const Pitch = () => {
  return <div className="flex flex-col relative justify-center items-center overflow-hidden w-full h-full">
    <div className="flex flex-col w-full max-w-7xl">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-martelsans-extraBold">Play, Learn and Earn Bonus </h1>
        <h3 className="text-xl text-neutral-300">Check Yourself and Earn yourself!</h3>
      </div>
      <div className="flex flex-row gap-6 justify-center items-center w-full">
        <div className="flex flex-col bg-white rounded-3xl p-4 py-20">
          <Image src={thinking} alt='' className='p-8'/>
          <h1 className='text-black font-extrabold px-8 text-2xl'>Test Your IQ!</h1>
        </div>
        <div className="flex flex-col bg-white rounded-3xl p-4 py-20">
          <Image src={money} alt='' className='p-8'/>
          <h1 className='text-black font-extrabold px-8 text-2xl'>Test Your IQ!</h1>
        </div>

        <div className="flex flex-col bg-white rounded-3xl p-4 py-20">
          <Image src={reading} alt='' className='p-8'/>
          <h1 className='text-black font-extrabold px-8 text-2xl'>Test Your IQ!</h1>
        </div>
      </div>
    </div>
  </div>
}

export default Pitch;