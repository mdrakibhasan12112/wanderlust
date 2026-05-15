'use client'
import { Button, Card } from '@heroui/react';
import { CheckCircle2 } from 'lucide-react';
import { DateField, Label } from '@heroui/react';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast';

const BookingCard = ({ destination }) => {
 const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

 const [departureDate, setDepartureDate] = useState(null)
 const { price,_id ,destinationName ,imageUrl,country} = destination;
 
 const handleBooking = async () => {
  const bookingData = {
   userId: user?.id,
   userImage: user?.image,
   userName: user?.name,
   destinationId: _id,
   destinationName,
   price,
   imageUrl,
   country,
   departureDate: new Date(departureDate)
  }
  const res = await fetch('http://localhost:5000/bookings', {
   method: "POST",
   headers: {
    'content-type': 'application/json'
   },
   body:JSON.stringify(bookingData)
  });
  const data = await res.json()
  console.log(data);
toast.success('You booked successfully')
 }

 return (
  <div className="lg:col-span-1">
   <Toaster position='top-right'/>
     <Card className="border shadow-sm p-2" radius="lg">
       <div className="p-6">
         <div className="mb-6">
           <p className="text-gray-500 text-sm">Starting from</p>
           <div className="flex items-baseline gap-1">
             <span className="text-3xl font-bold text-cyan-500">${price}</span>
             <span className="text-gray-500 text-sm">per person</span>
           </div>
         </div>

         <div className="mb-6 bg-gray-50 p-3 rounded-md border border-gray-100">
           <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
             <Label>Departure Date</Label>
             <DateField.Group>
               <DateField.Input>
                 {segment => <DateField.Segment segment={segment} />}
               </DateField.Input>
             </DateField.Group>
           </DateField>
         </div>

         <Button
           onClick={handleBooking}
           className="w-full bg-cyan-500 h-12 text-lg font-medium mb-6 rounded-none"
         >
           Book Now
         </Button>

         {/* <Divider className="my-4" /> */}

         <ul className="space-y-3">
           <li className="flex items-center gap-2 text-sm text-gray-600">
             <CheckCircle2 size={16} className="text-green-500" /> Free
             cancellation up to 7 days
           </li>
           <li className="flex items-center gap-2 text-sm text-gray-600">
             <CheckCircle2 size={16} className="text-green-500" /> Travel
             insurance included
           </li>
           <li className="flex items-center gap-2 text-sm text-gray-600">
             <CheckCircle2 size={16} className="text-green-500" /> 24/7 customer
             support
           </li>
         </ul>
       </div>
     </Card>
   </div>
 );
};

export default BookingCard;