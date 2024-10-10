"use client";
import { useState } from "react";
import { airports } from "@/lib/config";
import Image from "next/image";
import { mark, leftRight, dropdown } from "@/public/images";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const today = new Date();

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

  const handleSwap = () => {
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
  };

  const filteredFromOptions = airports.filter(
    (airport) => airport.name !== selectedTo
  );
  const filteredToOptions = airports.filter(
    (airport) => airport.name !== selectedFrom
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex cursor-pointer">
                        <div className="justify-start items-center gap-2.5 flex">
                          <div className="w-5 h-5 relative">
                            <Image
                              src={mark}
                              alt="Location Icon"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide flex gap-2">
                            {selectedFrom}
                          </div>
                        </div>
                        <div className="w-4 h-4 relative">
                          <Image
                            src={dropdown}
                            alt="Dropdown Icon"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-[#e5e7ea] rounded-md shadow-md w-64">
                      <DropdownMenuLabel className="text-gray-500 px-4 py-2">
                        Select an airport
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
                      {filteredFromOptions.map((airport) => (
                        <DropdownMenuItem
                          key={airport.code}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectFrom(airport.name)}
                        >
                          {airport.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Swap Icon */}
                  <div
                    className="px-4 py-[18px] bg-[#f4f6f9] rounded-[49px] justify-start items-center gap-2.5 flex cursor-pointer"
                    onClick={handleSwap}
                  >
                    <div className="w-5 h-5 relative">
                      <Image src={leftRight} alt="Swap Icon" />
                    </div>
                  </div>

                  {/* Where To Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex cursor-pointer">
                        <div className="justify-start items-center gap-2.5 flex">
                          <div className="w-5 h-5 relative">
                            <Image
                              src={mark}
                              alt="Location Icon"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide">
                            {selectedTo}
                          </div>
                        </div>
                        <div className="w-4 h-4 relative">
                          <Image
                            src={dropdown}
                            alt="Dropdown Icon"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-[#e5e7ea] rounded-md shadow-md w-64">
                      <DropdownMenuLabel className="text-gray-500 px-4 py-2">
                        Select an airport
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
                      {filteredToOptions.map((airport) => (
                        <DropdownMenuItem
                          key={airport.code}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectTo(airport.name)}
                        >
                          {airport.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Departure and Return Date Inputs */}
                <div className="w-[366px] self-stretch justify-end items-start gap-3 flex">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex cursor-pointer">
                        <div className="justify-start items-center gap-2.5 flex">
                          <CalendarIcon className="w-5 h-5 text-[#47494c]" />
                          <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide">
                            {departureDate
                              ? format(departureDate, "PPP")
                              : "Departure"}
                          </div>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        fromDate={today}
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="grow shrink basis-0 h-[60px] p-3 bg-white rounded-md border border-[#e5e7ea] justify-between items-center flex cursor-pointer">
                        <div className="justify-start items-center gap-2.5 flex">
                          <CalendarIcon className="w-5 h-5 text-[#47494c]" />
                          <div className="text-[#47494c] text-base font-normal font-['Neue Montreal'] leading-none tracking-wide">
                            {returnDate ? format(returnDate, "PPP") : "Return"}
                          </div>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        fromDate={today}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Search Flights Button */}
            <Link
              href="/results"
              className="w-[249px] p-4 left-[780px] top-[180px] absolute bg-[#003e39] rounded-[7px] justify-center items-center gap-3 inline-flex"
            >
              <div className="w-4 h-4 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.16683 2.66665C5.40541 2.66665 3.16683 4.90522 3.16683 7.66665C3.16683 10.4281 5.40541 12.6666 8.16683 12.6666C9.5089 12.6666 10.7275 12.1379 11.6256 11.2773C11.6463 11.2486 11.6696 11.2211 11.6955 11.1952C11.7214 11.1694 11.7488 11.1461 11.7776 11.1253C12.6381 10.2272 13.1668 9.00869 13.1668 7.66665C13.1668 4.90522 10.9283 2.66665 8.16683 2.66665ZM13.0919 11.6488C13.9726 10.5609 14.5002 9.1754 14.5002 7.66665C14.5002 4.16884 11.6646 1.33331 8.16683 1.33331C4.66903 1.33331 1.8335 4.16884 1.8335 7.66665C1.8335 11.1645 4.66903 14 8.16683 14C9.67561 14 11.0612 13.4724 12.1491 12.5916L14.0288 14.4714C14.2891 14.7317 14.7112 14.7317 14.9716 14.4714C15.2319 14.211 15.2319 13.7889 14.9716 13.5286L13.0919 11.6488Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="text-white text-base font-medium font-['Neue Montreal'] leading-none tracking-wide">
                Search flights
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
