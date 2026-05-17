import React from 'react';
import { Button, Card } from '@heroui/react';
import {
  MapPin,
  Star,
  Calendar,
  ArrowLeft,
  Edit3,
  Trash2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { EditForm } from '@/components/EditForm';
import { DeleteData } from '@/components/DeleteData';
import BookingCard from '@/components/BookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  // secure backend
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destinations/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const destination = await res.json();
  // console.log(destination);

  const {
    departureDate,
    description,
    imageUrl,
    destinationName,
    duration,
    country,
  } = destination;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white">
      {/* Top Navigation & Actions */}
      <div className="flex justify-between items-center mb-6">
        <Link href={'/destinations'}>
          <Button
            variant="light"
            startContent={<ArrowLeft size={18} />}
            className="text-gray-500"
          >
            <ArrowLeft /> Back to Destinations
          </Button>
        </Link>
        <div className="flex gap-2">
          <EditForm destination={destination}></EditForm>
          <DeleteData destination={destination}></DeleteData>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="w-full h-[300px] md:h-[450px] overflow-hidden rounded-xl mb-8">
        <Image
          src={imageUrl}
          alt={destinationName}
          className="w-full h-full object-cover"
          radius="none"
          width={300}
          height={300}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Information */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-1 text-gray-400 mb-2">
            <MapPin size={16} />
            <span className="text-sm">{country}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {destinationName}
          </h1>

          <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-green-500" fill="currentColor" />
              <span className="font-bold text-gray-900">4.9</span>
              <span>(234 reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={18} />
              <span>{duration}</span>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Luxury beachfront accommodation',
                  'Visit Uluwatu Temple at sunset',
                  'Traditional Balinese spa treatment',
                  'Private beach dinner experience',
                  'Sunrise trek to Mount Batur',
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2
                      size={18}
                      className="text-green-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Side: Booking Card */}
        <BookingCard destination={destination}></BookingCard>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
