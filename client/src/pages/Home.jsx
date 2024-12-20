import React from 'react'

const Home = () => {
  return (
    <div className="w-full bg-gray-900 flex justify-center items-center py-10">
      <div className="w-[90%] lg:w-[50%] flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0 lg:space-x-10">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl text-red-800 font-semibold">Home Page</h1>
          <p className="text-lg text-white leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eius facere est aspernatur voluptatem beatae magni unde soluta doloribus reprehenderit sequi necessitatibus id fugiat, earum, quisquam temporibus deleniti nam voluptatum.
          </p>
          <p className="text-md text-yellow-200">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, eum adipisci autem id dignissimos rerum.
          </p>
        </div>
        <div className="flex justify-center">
          <img src="react.svg" alt="image" className="h-[400px] lg:h-[700px] object-contain" />
        </div>
      </div>
    </div>
  );
  
}

export default Home