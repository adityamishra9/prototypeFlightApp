"use client";
import Image from "next/image";
import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import { airports } from "@/lib/config";

const page = () => {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departure = searchParams.get("departure");
  const returnDate = searchParams.get("return");

  const departureFormatted = departure
    ? format(parseISO(departure as string), "MMM dd")
    : "";
  const returnFormatted = returnDate
    ? format(parseISO(returnDate as string), "MMM dd")
    : "";

  const getAirportCode = (name: any) => {
    const airport = airports.find((airport) => airport.name === name);
    return airport ? airport.code : "N/A";
  };

  const fromCode = getAirportCode(from);
  const toCode = getAirportCode(to);

  interface FlightSegment {
    airline: string;
    flightCode: string;
    logoUrl: string;
    time: string;
    route: string;
    duration: string;
    stops: string;
    isNextDay?: boolean;
    layover?: string;
  }

  interface Journey {
    price: string;
    outbound: FlightSegment;
    return: FlightSegment;
    outboundDate: string;
    returnDate: string;
  }

  const journeys: Journey[] = [
    {
      price: 'AED 2,456.90',
      outboundDate: 'Thu 25 Jun',
      returnDate: 'Sat 2 Jul',
      outbound: {
        airline: 'Emirates',
        flightCode: 'AT 4334',
        logoUrl: 'https://via.placeholder.com/40x22',
        time: '9:45 AM - 11:45 AM',
        route: 'CDG - DXB',
        duration: '2h 10min',
        stops: 'Non stop',
      },
      return: {
        airline: 'Lufthansa',
        flightCode: 'AT 4334',
        logoUrl: 'https://via.placeholder.com/66x66',
        time: '11:45 PM - 6:45 AM',
        route: 'DXB - CDG',
        duration: '4h 10min',
        stops: '2 stops',
        isNextDay: true,
        layover: '6h 32m in Lisbon, Paris',
      },
    },
    {
      price: 'AED 1,456.90',
      outboundDate: 'Thu 25 Jun',
      returnDate: 'Sat 2 Jul',
      outbound: {
        airline: 'Emirates',
        flightCode: 'AT 4334',
        logoUrl: 'https://via.placeholder.com/40x22',
        time: '9:45 AM - 11:45 AM',
        route: 'CDG - DXB',
        duration: '7h 10min',
        stops: '1 stop',
      },
      return: {
        airline: 'Emirates',
        flightCode: 'AT 4334',
        logoUrl: 'https://via.placeholder.com/40x22',
        time: '11:45 PM - 6:45 AM',
        route: 'CDG - DXB',
        duration: '19h 10min',
        stops: '1 stop',
        isNextDay: true,
      },
    },
    {
      price: 'AED 1,456.90',
      outboundDate: 'Thu 25 Jun',
      returnDate: 'Thu 25 Jun',
      outbound: {
        airline: 'Lufthansa',
        flightCode: 'AT 4334',
        logoUrl: 'https://via.placeholder.com/40x22',
        time: '9:45 AM - 11:45 AM',
        route: 'CDG - DXB',
        duration: '7h 10min',
        stops: 'Non stop',
      },
      return: {
        airline: 'Lufthansa',
        flightCode: 'AT 4334, Indigo • 6E 783',
        logoUrl: 'https://via.placeholder.com/40x22',
        time: '11:45 PM - 6:45 AM',
        route: 'CDG - DXB',
        duration: '4h 10min',
        stops: 'Non stop',
        isNextDay: true,
      },
    },
    {
      price: 'AED 2,456.90',
      outboundDate: 'Thu 25 Jun',
      returnDate: 'Sat 2 Jul',
      outbound: {
        airline: 'Emirates',
        flightCode: 'AT 4334',
        logoUrl: 'https://via.placeholder.com/40x22',
        time: '9:45 AM - 11:45 AM',
        route: 'CDG - DXB',
        duration: '2h 10min',
        stops: 'Non stop',
      },
      return: {
        airline: 'Lufthansa',
        flightCode: 'AT 4334',
        logoUrl: 'https://via.placeholder.com/66x66',
        time: '11:45 PM - 6:45 AM',
        route: 'DXB - CDG',
        duration: '4h 10min',
        stops: '2 stops',
        isNextDay: true,
        layover: '6h 32m in Lisbon, Paris',
      },
    },
  ];  

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      {/* Top Filter Bar */}
      <div className="w-full bg-white border-b border-gray-200 flex justify-center">
        <div className="w-full max-w-6xl flex items-center justify-between px-12 py-4">
          {/* Filter Container */}
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 space-x-4 w-auto max-w-2xl">
            {/* From Location */}
            <div className="flex items-center truncate">
              <span className="font-semibold text-gray-900">{fromCode}</span>
              <span className="text-gray-500 ml-2 truncate">
                {from || "Where from?"}
              </span>
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300"></div>
            {/* To Location */}
            <div className="flex items-center truncate">
              <span className="font-semibold text-gray-900">{toCode}</span>
              <span className="text-gray-500 ml-2 truncate">
                {to || "Where to?"}
              </span>
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300"></div>
            {/* Dates */}
            <div className="text-gray-900 font-semibold whitespace-nowrap">
              {departureFormatted && returnFormatted
                ? `${departureFormatted} - ${returnFormatted}`
                : "Select Dates"}
            </div>
            {/* Divider for Search Icon */}
            <div className="h-6 w-px bg-gray-300 ml-2"></div>
            {/* Search Icon */}
            <div className="bg-gray-100 rounded-full p-2">
              <FiSearch className="text-gray-500 w-4 h-4" />
            </div>
          </div>

          {/* Close Button with Spacing */}
          <button className="mr-2 p-2 rounded-full border border-gray-300">
            <FiX className="text-gray-500 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="w-full max-w-6xl p-6 space-y-4">
        {/* Results Header */}
        <div className="text-gray-600">Showing 356 of 767 results</div>

        {/* Flight Card */}
        <div>
      {journeys.map((journey, index) => (
        <div key={index} className="w-[1056px] h-[200px] relative bg-white rounded-[7px] border border-[#e5e7ea] mb-6">
          {/* Outbound Flight Segment */}
          <div className="absolute left-[30px] top-[16px] text-[#777a7f] text-[13px] font-medium font-['Neue Montreal'] leading-[17.55px] tracking-wide">
            {journey.outboundDate}
          </div>
          <div className="w-11 h-11 px-0.5 py-[11px] left-[30px] top-[42px] absolute bg-white rounded border border-[#e6e8eb] flex justify-center items-center">
            <img className="w-10 h-[22px]" src={journey.outbound.logoUrl} alt={`${journey.outbound.airline} Logo`} />
          </div>
          <div className="absolute left-[90px] top-[42px] text-[#777a7f] text-[13px] font-normal font-['Neue Montreal'] leading-[17.55px] tracking-wide">
            {journey.outbound.airline} • {journey.outbound.flightCode}
          </div>
          <div className="absolute left-[90px] top-[67px] text-[#001f1d] text-lg font-normal font-['Neue Montreal'] leading-[18px] tracking-tight">
            {journey.outbound.time}
          </div>
          <div className="absolute left-[540px] top-[42px] text-right text-[#777a7f] text-sm font-normal font-['Neue Montreal'] leading-[18.90px] tracking-wide">
            {journey.outbound.route}
          </div>
          <div className="absolute left-[541px] top-[68px] text-right text-[#001f1d] text-lg font-normal font-['Neue Montreal'] leading-[18px] tracking-tight">
            {journey.outbound.duration}
          </div>
          <div className="absolute left-[689px] top-[68px] text-[#000c0b] text-lg font-normal font-['Neue Montreal'] leading-[18px] tracking-tight">
            {journey.outbound.stops}
          </div>

          {/* Return Flight Segment */}
          <div className="absolute left-[30px] top-[114px] text-[#777a7f] text-[13px] font-medium font-['Neue Montreal'] leading-[17.55px] tracking-wide">
            {journey.returnDate}
          </div>
          <div className="w-11 h-11 px-0.5 py-[11px] left-[30px] top-[140px] absolute bg-white rounded border border-[#e6e8eb] flex justify-center items-center">
            <img className="w-10 h-[22px]" src={journey.return.logoUrl} alt={`${journey.return.airline} Logo`} />
          </div>
          <div className="absolute left-[90px] top-[140px] text-[#777a7f] text-[13px] font-normal font-['Neue Montreal'] leading-[17.55px] tracking-wide">
            {journey.return.airline} • {journey.return.flightCode}
          </div>
          <div className="absolute left-[90px] top-[165px] text-[#001f1d] text-lg font-normal font-['Neue Montreal'] leading-[18px] tracking-tight">
            {journey.return.time}
          </div>
          <div className="absolute left-[540px] top-[140px] text-right text-[#777a7f] text-sm font-normal font-['Neue Montreal'] leading-[18.90px] tracking-wide">
            {journey.return.route}
          </div>
          <div className="absolute left-[533px] top-[165px] text-right text-[#001f1d] text-lg font-normal font-['Neue Montreal'] leading-[18px] tracking-tight">
            {journey.return.duration}
          </div>
          <div className="absolute left-[689px] top-[165px] text-[#000c0b] text-lg font-normal font-['Neue Montreal'] leading-[18px] tracking-tight">
            {journey.return.stops}
          </div>

          {/* Extra Information */}
          {journey.return.isNextDay && (
            <div className="absolute left-[246px] top-[165px] text-[#962828]/95 text-xs font-medium font-['Neue Montreal'] leading-3 tracking-wide">
              +1 day
            </div>
          )}
          {journey.return.layover && (
            <div className="truncate absolute left-[689px] top-[141px] w-[134px] text-[#777a7f] text-sm font-normal font-['Neue Montreal'] leading-[18.90px] tracking-wide">
              {journey.return.layover}
            </div>
          )}

          {/* Price and Select Button */}
          <div className="absolute left-[858px] top-[108px] text-[#001f1d] text-xl font-normal font-['Neue Montreal'] leading-tight tracking-tight">
            {journey.price}
          </div>
          <div className="absolute left-[858px] top-[86px] text-[#777a7f] text-sm font-normal font-['Neue Montreal'] leading-[14px] tracking-wide">
            from
          </div>
          <div className="w-[182px] px-4 py-3 left-[858px] top-[144px] absolute bg-[#003e39] rounded-[7px] flex justify-center items-center gap-2">
            <div className="text-white text-base font-medium font-['Neue Montreal'] leading-none tracking-wide">Select</div>
          </div>

          {/* Divider */}
          <div className="w-[200px] h-[0px] left-[842px] top-0 absolute origin-top-left rotate-90 border border-[#e5e7ea]"></div>
        </div>
      ))}
    </div>

        {/* Additional Flight Cards can be added here */}
      </div>
    </div>
  );
};

export default page;
