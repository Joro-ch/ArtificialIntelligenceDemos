import Link from 'next/link'

export default function NavBar({ }) {
    return (
        <nav className="bg-nav-color h-10 flex items-center text-white">
            <ul className='flex justify-evenly w-full'>
                <li className='hover:text-gray-200'>
                    <Link href={"/"}> Tools </Link>
                </li>
                <li className='hover:text-gray-200'>
                    <Link href={"/AboutAs"}> About As </Link>
                </li>
            </ul>
        </nav>
    )
}