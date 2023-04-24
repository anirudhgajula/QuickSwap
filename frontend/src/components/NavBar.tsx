import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center py-4 ml-4 mr-4">
            <p className="text-2xl font-bold text-gray-200 px-4">GoETH/NT Transfer</p>
            <div className="flex">
                <Link href="/goerli"
                className="rounded bg-blue-800 text-white py-2 px-4 mr-4"
                >
                    Send GoETH
                </Link>
                <Link href="/besu"
                className="rounded bg-blue-800 text-white py-2 px-4 mr-4"
                >
                    Send NewToken
                </Link>
            </div>
        </nav>
    )
}