import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const main_nav =
  "lg-inline-flex lg:w-auto w-full px-3 py-2 text-lg rounded text-white font-bold items-center justify-center hover:bg-lime-600";
const back_nav =
  "lg-inline-flex lg:w-auto w-full px-3 py-2 text-lg rounded text-white font-bold items-center justify-center bg-lime-600 hover:bg-lime-700 mr-1";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const { data: session } = useSession();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="flex items-center flex-wrap bg-stone-900 p-3">
      <Link href="/">
        <a className="items-center p-1 mr-4">
          <span className="text-5xl text-lime-500 h-8 w-8">Album</span>
          <span className="text-5xl text-white h-8 w-8">-a-</span>
          <span className="text-5xl text-lime-500 h-8 w-8">Day</span>
        </a>
      </Link>
      <button
        className="inline-flex p-3 hover:bg-lime-800 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`${
          active ? "" : "hidden"
        } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link href="/current">
            <a className={main_nav}>Current</a>
          </Link>
          <Link href="/albums">
            <a className={main_nav}>Albums</a>
          </Link>
          <Link href="/add">
            <a className={main_nav}>Add an Album</a>
          </Link>
        </div>
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          <>
            {session ? (
              <button className={back_nav} onClick={() => signOut()}>
                Log Out
              </button>
            ) : (
              <button className={back_nav} onClick={() => signIn("spotify")}>
                Login
              </button>
            )}
            <Link href="/">
              <a className={back_nav}>About</a>
            </Link>
          </>
        </div>
      </div>
    </nav>
  );
}
