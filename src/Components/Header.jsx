import React from 'react'

function Header() {
  return (
 <header className='w-full h-12 bg-violet-300 border-b border-b-white'>
<nav className='w-[90%] h-full mx-auto flex justify-between items-center'>
    <div className='text-4xl font-extrabold  text-white font-'>TASKFLOW</div>
    <div className='text-white'>Night mode</div>
</nav>
 </header>
  )
}

export default Header