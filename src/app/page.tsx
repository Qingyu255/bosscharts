import HomeSearchBar from '@/components/HomeSearchBar'

export default function Home () {
  return (
    <main className="flex justify-center py-12">
      <div className='flex flex-col w-9/12 sm:w-7/12 xl:w-5/12 gap-y-3'>
        <h1 className='text-lg sm:text-xl font-medium'>Search Courses or Professors </h1>
        <div className='flex justify-center'>
          <HomeSearchBar/>
        </div>
        <div className='flex justify-center items-center cursor-none py-10'>
          <iframe src="https://giphy.com/embed/AMM34E6UHzDkZv73JZ" width="180" height="180" className="giphy-embed rounded-xl" allowFullScreen style={{ pointerEvents: 'none' }}></iframe><p></p>
        </div>
      </div>
    </main>
  )
}
