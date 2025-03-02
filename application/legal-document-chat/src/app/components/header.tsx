"use client";

import Link from 'next/link'

import { ReactElement, useState } from "react";

interface NavElement {
  key: number,
  name: string,
  href: string
}

export default function Header(): ReactElement {

  const pageTitle = (
    <div className="flex flex-row text-3xl font-black">
      <h1 className="bg-gradient-to-r from-(--accent-2) to-(--accent-1) text-transparent bg-clip-text">
        Legal Document
      </h1>
      <h1 className="ml-[6px] text-(--accent-1)">
        Chat
      </h1>
    </div>
  )

  const navigationOptions: NavElement[] = [
    {
      key: 1,
      name: 'Home',
      href: '/home'
    },
    {
      key: 2,
      name: "Chat",
      href: "/chat"
    }
  ]

  const [isExpanded, setExpanded] = useState<boolean>(false)

  const leftHeader = (
    <div className='flex flex-row items-center font-bold text-(--accent-1)'>
      {navigationOptions.map((element, index) => (
        <div className='flex flex-row' key={element.key}>
          {index != 0 ? (<div className='border-r-2 border-(--accent-1-60)'></div>) : null}
          <Link href={element.href} className='px-3'>
            {element.name}
          </Link>
        </div>
      ))}
    </div>
  )

  return (
    <header className="flex flex-row justify-between items-center px-4 py-5 border-b-1 border-(--accent-1-30)">
      {pageTitle}
      {leftHeader}
    </header>
  )
}