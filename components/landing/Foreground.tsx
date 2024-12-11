
import Image from 'next/image';
import lines from './assets/Line.svg'

const Foreground = () => {
  return <div className="flex absolute z-20 h-full w-full overflow-hidden">
    <div className='absolute w-full h-full top-0 left-44 justify-center items-center z-30'>
      <Image src={lines} alt='' />
    </div>
    <div className="absolute w-full h-full top-44 left-48">
      <div className="flex h-64 w-72 bg-azure-radiance-500 blur-[150px]">
      </div>
    </div>
    <div className="absolute w-full h-full top-96 left-2/4">
      <div className="flex h-48 w-96 bg-azure-radiance-500 blur-[200px]">
      </div>
    </div>
  </div>
}

export default Foreground;