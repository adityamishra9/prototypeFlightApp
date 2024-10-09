"use client";
import { useState } from "react";
import Image from "next/image";
import { calendar, mark, leftRight, dropdown } from "@/public/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FlightSearchForm: React.FC = () => {
  const [selectedFrom, setSelectedFrom] = useState<string>("Where from?");
  const [selectedTo, setSelectedTo] = useState<string>("Where to?");

  const handleSelectFrom = (airportName: string) => {
    setSelectedFrom(airportName);
    if (airportName === selectedTo) {
      setSelectedTo("Where to?");
    }
  };

  const handleSelectTo = (airportName: string) => {
    setSelectedTo(airportName);
    if (airportName === selectedFrom) {
      setSelectedFrom("Where from?");
    }
  };

  const airports = [
    { name: "Indira Gandhi International Airport", code: "DEL", city: "New Delhi", country: "India" },
    { name: "Chhatrapati Shivaji Maharaj International Airport", code: "BOM", city: "Mumbai", country: "India" },
    { name: "John F. Kennedy International Airport", code: "JFK", city: "New York", country: "United States" },
    { name: "Dubai International Airport", code: "DXB", city: "Dubai", country: "United Arab Emirates" },
    { name: "Heathrow Airport", code: "LHR", city: "London", country: "United Kingdom" },
    { name: "Singapore Changi Airport", code: "SIN", city: "Singapore", country: "Singapore" },
    { name: "Los Angeles International Airport", code: "LAX", city: "Los Angeles", country: "United States" },
    { name: "Beijing Capital International Airport", code: "PEK", city: "Beijing", country: "China" },
    { name: "Sydney Kingsford Smith International Airport", code: "SYD", city: "Sydney", country: "Australia" },
    { name: "Tokyo Haneda Airport", code: "HND", city: "Tokyo", country: "Japan" },
  ];

  const filteredFromOptions = airports.filter(airport => airport.name !== selectedTo);
  const filteredToOptions = airports.filter(airport => airport.name !== selectedFrom);

  return (
    <div className="w-[1440px] h-[900px] relative bg-white">
      <div className="w-[1200px] h-[900px] left-[120px] top-0 absolute bg-white">
        <div className="left-[431px] top-[106px] absolute text-[#000c0b] text-4xl font-normal font-['Neue Montreal']">
          Good afternoon, Brian
        </div>
        <div className="w-[1057px] h-[252px] px-7 py-6 left-[72px] top-[181px] absolute bg-white rounded-xl shadow border border-[#e5e7ea] flex-col justify-start items-center gap-8 inline-flex">
          <div className="self-stretch h-[120px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch justify-start items-center gap-[572px] inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <div className="h-9 px-3 py-2.5 bg-[#f4f6f9] rounded-md justify-center items-center gap-2 flex">
                  <div className="text-[#000c0b] text-base font-medium font-['Neue Montreal'] leading-none tracking-wide">
                    Flights
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-center items-center gap-3 flex">
                
                {/* Where From Dropdown */}
                <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative">
                      <Image src={mark} alt="Location Icon" width={20} height={20} />
                    </div>
                    <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide flex gap-2">
                      {selectedFrom}
                    </div>
                  </div>
                  <div className="w-4 h-4 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Image src={dropdown} alt="Dropdown Icon" width={16} height={16} className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-[#e5e7ea] rounded-md shadow-md w-64">
                        <DropdownMenuLabel className="text-gray-500 px-4 py-2">Select an airport</DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
                        {filteredFromOptions.map((airport) => (
                          <DropdownMenuItem key={airport.code} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSelectFrom(airport.name)}>
                            {airport.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="px-4 py-[18px] bg-[#f4f6f9] rounded-[49px] justify-start items-center gap-2.5 flex">
                  <div className="w-5 h-5 relative">
                    <Image src={leftRight} alt="Swap Icon" />
                  </div>
                </div>
                
                {/* Where To Dropdown */}
                <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative">
                      <Image src={mark} alt="Location Icon" width={20} height={20} />
                    </div>
                    <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide">
                      {selectedTo}
                    </div>
                  </div>
                  <div className="w-4 h-4 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Image src={dropdown} alt="Dropdown Icon" width={16} height={16} className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-[#e5e7ea] rounded-md shadow-md w-64">
                        <DropdownMenuLabel className="text-gray-500 px-4 py-2">Select an airport</DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
                        {filteredToOptions.map((airport) => (
                          <DropdownMenuItem key={airport.code} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSelectTo(airport.name)}>
                            {airport.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              
              <div className="w-[366px] self-stretch justify-end items-start gap-3 flex">
                <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative">
                      <Image src={calendar} alt="Calendar Icon" />
                    </div>
                    <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide">
                      Departure
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative">
                      <Image src={calendar} alt="Calendar Icon" />
                    </div>
                    <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide">
                      Return
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-[249px] p-4 left-[780px] top-[180px] absolute bg-[#003e39] rounded-[7px] justify-center items-center gap-3 inline-flex">
            <div className="w-4 h-4 relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.16683 2.66665C5.40541 2.66665 3.16683 4.90522 3.16683 7.66665C3.16683 10.4281 5.40541 12.6666 8.16683 12.6666C9.5089 12.6666 10.7275 12.1379 11.6256 11.2773C11.6463 11.2486 11.6696 11.2211 11.6955 11.1952C11.7214 11.1694 11.7488 11.1461 11.7776 11.1253C12.6381 10.2272 13.1668 9.00869 13.1668 7.66665C13.1668 4.90522 10.9283 2.66665 8.16683 2.66665ZM13.0919 11.6488C13.9726 10.5609 14.5002 9.1754 14.5002 7.66665C14.5002 4.16884 11.6646 1.33331 8.16683 1.33331C4.66903 1.33331 1.8335 4.16884 1.8335 7.66665C1.8335 11.1645 4.66903 14 8.16683 14C9.67561 14 11.0612 13.4724 12.1491 12.5916L14.0288 14.4714C14.2891 14.7317 14.7112 14.7317 14.9716 14.4714C15.2319 14.211 15.2319 13.7889 14.9716 13.5286L13.0919 11.6488Z" fill="white" />
              </svg>
            </div>
            <div className="text-white text-base font-medium font-['Neue Montreal'] leading-none tracking-wide">
              Search flights
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
