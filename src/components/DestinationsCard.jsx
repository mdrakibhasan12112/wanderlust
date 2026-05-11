import React from 'react';
import { Card, CardFooter, Button } from '@heroui/react';
import { MapPin, Calendar, ArrowUpRight, Star } from 'lucide-react';

const DestinationsCard = ({ destination }) => {
  const {
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    rating = '4.5',
  } = destination;
  return (
    <Card className="max-w-[350px] border-none bg-background shadow-md overflow-hidden rounded-2xl">
      {/* ইমেজ সেকশন এবং রেটিং */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={destinationName}
          className="z-0 w-full h-[200px] object-cover"
        />
        <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <span className="text-sm font-bold text-black">{rating}</span>
          <Star size={14} fill="black" />
        </div>
      </div>

      <div className="px-4 py-3 bg-white">
        {/* লোকেশন */}
        <div className="flex items-center gap-1 text-gray-500 mb-1">
          <MapPin size={16} />
          <span className="text-sm">{country}</span>
        </div>

        {/* টাইটেল এবং প্রাইস */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{destinationName}</h3>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">${price}</p>
            <p className="text-[10px] text-gray-400 uppercase">/ Person</p>
          </div>
        </div>

        {/* ডিউরেশন */}
        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <Calendar size={16} />
          <span className="text-sm font-medium">{duration}</span>
        </div>
      </div>

      <CardFooter className="px-4 pb-4 pt-0 bg-white">
        <Button
          variant="light"
          className="p-0 text-primary font-bold hover:bg-transparent"
          endContent={<ArrowUpRight size={18} />}
        >
          BOOK NOW
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationsCard;
