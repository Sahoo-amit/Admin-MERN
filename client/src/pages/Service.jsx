import React, { useEffect, useState } from 'react'

const Service = () => {
  const [data, setData] = useState([])

  const fetchData =async()=>{
    const response = await fetch(`http://localhost:4000/api/service`)
    const result = await response.json()
    console.log(result.msg)
    setData(result.msg)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="w-full bg-gray-900 pt-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-md p-6 text-white space-y-4"
          >
            <h1 className="text-lg font-semibold">
              <span className="text-green-400">Title:</span> {item.title}
            </h1>
            <h3 className="text-md">
              <span className="text-green-400 font-semibold">Author:</span> {item.author}
            </h3>
            <p className="text-sm">
              <span className="text-green-400 font-semibold">Content:</span> {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Service