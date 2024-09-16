import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='text-white flex flex-col gap-4 justify-center items-center'>
      <h1 className='mt-32'>404 - Page Not Found</h1>
      <h2 className='mt-2'>404 - Stránka nenalezena</h2>
      <Link href={'/'}>Home / Domů</Link>
    </div>
  )
}
