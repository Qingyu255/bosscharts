import FacultyCard from '@/components/cards/BasketCard'

type HomeProps = {
  facultyArray: Array<string>
}

// Maybe can pass in the faculty array through api call or something
export default function Home ({ facultyArray = ["Business", "Economics", "Accountancy", "CIS", "SOSS", "Law", "SCIS"] }: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-5 sm:px-8">
      <div>
        <h1 className='text-3xl font-bold py-6'>SMU Faculties</h1>
        <div className="grid items-center grid-cols-4 gap-2">
          {facultyArray.map((facultyName, index) => (
            <FacultyCard key={index} facultyName={facultyName} />
          ))}
        </div>
      </div>
    </main>
  )
}
