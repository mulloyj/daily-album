import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-stone-900 shadow md:flex md:items-center md:justify-between dark:bg-gray-800 align-bottom hidden">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Based on the book "1001 Albums You Must Hear Before You Die"
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="https://1001albumsgenerator.com"
            target="_blank"
            className="mr-4 hover:underline md:mr-6"
          >
            Inspiration
          </a>
        </li>
        <li>
          <a
            href="https://github.com/mulloyj/daily-album"
            target="_blank"
            className="mr-4 hover:underline md:mr-6"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}
