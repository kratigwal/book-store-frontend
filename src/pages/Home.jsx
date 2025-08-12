import React from 'react';
import Hero from '../components/Home/Hero';
import RecentleyAdded from '../components/Home/RecentleyAdded';

const Home = () => {
  return (
    <div  className='bg-zinc-900 text-white px-10 py-9'>
    
     <Hero />
     <RecentleyAdded />
     </div>
  )
}

export default Home;

