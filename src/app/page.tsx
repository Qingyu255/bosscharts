import HomeSearchBar from '@/components/HomeSearchBar'

export default async function Home () {

  const homePageTextContent: string[] = [
    "Welcome to SMU BOSS Charts!",
    "Visualise historic bid price trends across terms and bidding windows for any course taught in Singapore Management University (SMU)",
    "Search for courses or professors to begin! (Eg. COR-STAT1202 / Introductory Statistics)"
  ]

  return (
    <main className="flex justify-center py-12">
      <div className='flex flex-col w-9/12 sm:w-7/12 xl:w-5/12 gap-y-3'>
        <h1 className='text-lg sm:text-xl font-medium'>Search Courses or Professors </h1>
        <div className='flex justify-center'>
          <HomeSearchBar/>
        </div>
        <div className='flex flex-col gap-y-3 px-3 py-5'>
          <p className='text-sm sm:text-base text-gray-800 font-medium'>{homePageTextContent[0]}</p>
          <ul className='list-disc space-y-2'>
          {homePageTextContent.slice(1).map((text, index) => (
            <li key={index} className='text-xs sm:text-sm text-gray-500'>{text}</li>
          ))}
          </ul>
        </div>
        <div className='flex justify-center items-center cursor-none py-10'>
          <iframe src="https://giphy.com/embed/AMM34E6UHzDkZv73JZ" width="180" height="180" className="giphy-embed rounded-xl" allowFullScreen style={{ pointerEvents: 'none' }}></iframe><p></p>
        </div>
      </div>
    </main>
  )
}
