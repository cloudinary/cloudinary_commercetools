import Link from 'next/link'
import {useState} from 'react'

export default function NavBar() {
  const [navbar, setNavbar] = useState(false)

  return (
    <header>
      <nav className="border-b  border-orangeNew	 px-[6.25vw] py-2 text-2xl lg:py-6 ">
        <div className="justify-between md:flex md:items-center  ">
          <div>
            <div className="flex items-center justify-between py-3 md:block md:py-5">
              <div className="text-2xl font-medium">
                <Link href="/" className="hover:text-orangeNew">
                  Home
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="flex flex-col items-center gap-6 md:flex-row">
                <li>
                  <Link href="/products" className="hover:text-orangeNew">
                    Shop
                  </Link>
                </li>
                <li>What&rsquo;s new</li>
                <li>About</li>
                <li>Gifts</li>
                <li>
                  <div className="relative h-[40px] w-[240px] xl:ml-60">
                    <div className="absolute h-[40px] w-[240px] rounded-[35px] bg-orangeNew opacity-40"></div>
                    <div className="absolute flex h-[35px] items-center gap-4	 pl-4 xl:h-[40px] 3xl:h-[50px]">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="7"
                          stroke="black"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 18L13.5 13.5"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Search
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
