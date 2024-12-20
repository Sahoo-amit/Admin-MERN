import { useState, useEffect } from 'react';
import { useTokenContext } from '../context/TokenContext';

const About = () => {
  const [username, setUsername] = useState('Guest');
  const { user } = useTokenContext();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="w-full bg-gray-900 pt-20 flex justify-center">
      <div className="w-[90%] py-10 flex flex-col space-y-12">
        <div className="space-y-6">
          <h1 className="text-4xl text-orange-600 font-extrabold">About Page</h1>
          <h2 className="text-xl text-lime-500">
            {`${getGreeting()}, ${username}! Welcome to our website.`}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 lg:space-x-10">
          <div className="space-y-6 lg:w-1/2">
            <p className="text-md text-gray-300 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, ipsam porro. Debitis neque tenetur quaerat iste minima eveniet, maiores molestias expedita similique! Explicabo adipisci, officia inventore esse ducimus optio velit quas quos voluptates! Repellat ipsum cumque officia? Blanditiis perspiciatis reprehenderit totam? Aspernatur optio dicta laudantium incidunt. Autem, ratione. Inventore ullam eos dolores, dolore reprehenderit magnam. Eligendi, atque. Reiciendis iusto temporibus alias cumque et omnis incidunt quod ea veritatis eligendi vero, amet autem voluptas nesciunt quo ducimus, rerum consequuntur obcaecati dolore. Soluta quasi quia voluptas pariatur deleniti accusantium officiis perspiciatis cum voluptatibus reprehenderit quod officia quis ipsa nesciunt laborum dicta veniam voluptatum recusandae consequatur neque blanditiis nihil consectetur, cupiditate corporis. Reprehenderit atque nesciunt esse architecto laboriosam? Quam quibusdam sapiente minus numquam iure vitae hic odio. Reiciendis labore dolorem earum incidunt nobis odit excepturi voluptatum eius tenetur iusto officiis sapiente exercitationem ratione ea qui aperiam porro nemo distinctio impedit, dolor similique officia!
            </p>
            <p className="text-md text-yellow-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, eum adipisci autem id dignissimos rerum.
            </p>
          </div>
          <div className="flex justify-center lg:w-1/2">
            <img src="react.svg" alt="React logo" className="h-[400px] object-contain" />
          </div>
        </div>
      </div>
    </div>
  );  
};

export default About;

