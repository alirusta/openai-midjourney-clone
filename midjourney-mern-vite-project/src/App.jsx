import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo } from './assets'
import { Home, Create } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-[#c1c1c1] sm:px-8 px-4 py-4 border-b border-b-[#ffffff]'>
        <Link to='/'>
          <img src={logo} alt='logo'  className='w-28 object-contain' />
        </Link>

        <Link to='/create' className='font-inter font-medium bg-[#6469ff] hover:bg-[#7e79ff] active:bg-[#453fff] text-white px-4 py-2 rounded-md'>
          Create!
        </Link>
      </header>
      
      <main className='sm:p-8 px-4 py-8 w-full bg-[#484747] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App