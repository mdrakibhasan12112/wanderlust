import { Button } from '@heroui/react';
import React from 'react';
import DestinationsCard from './DestinationsCard';
import Link from 'next/link';


const Featured = async () => {
 const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`)
 const destinations = await res.json()
 console.log(destinations);
 return (
   <div className="max-w-7xl mx-auto mt-10">
     <div className="flex justify-between ">
       <div className="">
         <h1 className="text-5xl font-bold">Featured Destinations</h1>
         <p className="text-muted">
           Handpicked travel experiences for the adventure seekers
         </p>
       </div>
       <Link href={'/destinations'}>
         <Button
           variant="outline"
           className={'rounded-none text-cyan-500 border-cyan-500'}
         >
           All Destinations
         </Button>
       </Link>
     </div>

     <div className="grid grid-cols-3 gap-5 mt-5 mb-8">
       {destinations.map(destination => (
         <DestinationsCard key={destination._id} destination={destination} />
       ))}
     </div>
   </div>
 );
};

export default Featured;