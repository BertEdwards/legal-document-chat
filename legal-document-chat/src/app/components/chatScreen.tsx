"use client";

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

import React, { useEffect, useRef } from 'react';

export default function ChatScreen() {
  const leftSection = (
    <section className="border-r border-(--accent-1-30) flex-2 bg-(--background-2) p-5">
      <div className='bg-(--background-1) p-5 px-10 border border-(--accent-1-30) h-full'>

      </div>
    </section>
  )

  const rightSection = (
    <section className="flex-1 max-w-[400px] flex flex-col">
      <div className="flex-1">
        <button className="absolute p-2 cursor-pointer">
          <i className="text-2xl bi bi-file-earmark-arrow-up" />
        </button>
      </div>
      <div className="border-t border-(--accent-1-30) px-3 pt-4 pb-2 h-fit">
        <textarea rows={3} placeholder={"Send a message to chat to your document!"} className="resize-none m-auto border border-(--accent-1-30) rounded-xl w-full px-2 py-1">

        </textarea>
      </div>
    </section>
  )

  return (
    <div className="flex flex-row flex-1">
      {leftSection}
      {rightSection}
    </div>
  )
}