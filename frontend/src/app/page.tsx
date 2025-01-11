import Image from 'next/image'
import Navigation from './components/Navigation'
import PricingCards from './components/PricingCard'
import Footer2 from './components/Footer2'

export default async function Home() {
  return (
    <div className='bg-gradient-to-b from-teal-900 to-slate-900 min-h-screen text-white'>
      <Navigation />
      <section className="h-full w-full md:pt-44 pt-[10rem] pb-32 mt-[-70px]  relative flex items-center justify-center flex-col">

        {/* grid */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#1e4e4a_1px,transparent_1px),linear-gradient(to_bottom,#1e4e4a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

        <p className="text-center text-teal-300 mb-4">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-teal-400 to-emerald-400 text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
          Purity
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image
            src={'/Dashboardscreen.png'}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-teal-500/30"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t from-teal-900 left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center font-bold text-white">Choose what fits you right</h2>
        <p className="text-white text-center mb-8">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <PricingCards />
      </section>
      <Footer2/>
    </div>
  )
}
