import FacultyCard from '@/components/cards/BasketCard'
import HomeSearchBar from '@/components/HomeSearchBar'

// type HomeProps = {
//   facultyArray: Array<string>
// }

// Maybe can pass in the faculty array through api call or something
export default function Home () {
  return (
    <main className="flex min-h-screen justify-center py-12">
      <div className='flex flex-col w-7/12 xl:w-5/12'>
        <h1 className='text-md sm:text-xl font-medium py-3'>Search Courses or Professors </h1>
        <div className='flex justify-center'>
          <HomeSearchBar/>
        </div>
      </div>
    </main>
  )
}
