import DestinationsCard from '@/components/DestinationsCard';
import React from 'react';

const DestinationPage = async () => {
 const res = await fetch('http://localhost:5000/destinations');
 const destinations = await res.json()
 console.log(destinations);
 return (
   <div className="max-w-7xl mx-auto">
     <h1 className="text-5xl font-semibold mt-5">Explore All Destinations</h1>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
       {destinations.map(destination => (
         <DestinationsCard
           key={destination._id}
           destination={destination}
         ></DestinationsCard>
       ))}
     </div>
   </div>
 );
};

export default DestinationPage;