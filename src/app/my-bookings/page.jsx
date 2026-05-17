import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { BookingCancelAlert } from '@/components/BookingCancelAlert';

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // secure server site
  const { token } = await auth.api.getToken({
      headers: await headers(),
    });
  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await res.json();
  console.log(bookings);

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-semibold">My Bookings</h1>
      <p className="text-gray-500">
        Manage and view your upcoming travel plans
      </p>

      <div className="space-y-5 ">
        {bookings.map(booking => (
          <div key={booking._id} className="flex gap-5 border p-5 min-w-3xl ">
            <Image
              src={booking.imageUrl}
              alt={booking.destinationName}
              height={200}
              width={200}
            />
            <div>
              <h1 className="text-2xl font-bold">{booking.destinationName}</h1>
              <p className="text-gray-500">
                Departure:{' '}
                {new Date(booking.departureDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-500">BookingId: {booking._id}</p>
              <p className="text-3xl font-bold text-cyan-500">
                ${booking.price}
              </p>
              <BookingCancelAlert bookingId={booking?._id}></BookingCancelAlert>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingPage;
