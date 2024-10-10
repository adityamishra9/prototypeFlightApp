"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import { airports } from "@/lib/config";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { mark, leftRight, dropdown, Emirates, Lufthansa, LufthansaEn } from "@/public/images";
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
import Image from "next/image";

interface FlightSegment {
  airline: string;
  flightCode: string;
  logoUrl: any;
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
    price: "AED 2,456.90",
    outboundDate: "Thu 25 Jun",
    returnDate: "Sat 2 Jul",
    outbound: {
      airline: "Emirates",
      flightCode: "AT 4334",
      logoUrl: Emirates,
      time: "9:45 AM - 11:45 AM",
      route: "CDG - DXB",
      duration: "2h 10min",
      stops: "Non stop",
    },
    return: {
      airline: "Lufthansa",
      flightCode: "AT 4334",
      logoUrl: Lufthansa,
      time: "11:45 PM - 6:45 AM",
      route: "DXB - CDG",
      duration: "4h 10min",
      stops: "2 stops",
      isNextDay: true,
      layover: "6h 32m in Lisbon, Paris",
    },
  },
  {
    price: "AED 1,456.90",
    outboundDate: "Thu 25 Jun",
    returnDate: "Sat 2 Jul",
    outbound: {
      airline: "Emirates",
      flightCode: "AT 4334",
      logoUrl: Emirates,
      time: "9:45 AM - 11:45 AM",
      route: "CDG - DXB",
      duration: "7h 10min",
      stops: "1 stop",
    },
    return: {
      airline: "Emirates",
      flightCode: "AT 4334",
      logoUrl: Emirates,
      time: "11:45 PM - 6:45 AM",
      route: "CDG - DXB",
      duration: "19h 10min",
      stops: "1 stop",
      isNextDay: true,
    },
  },
  {
    price: "AED 1,456.90",
    outboundDate: "Thu 25 Jun",
    returnDate: "Thu 25 Jun",
    outbound: {
      airline: "Lufthansa",
      flightCode: "AT 4334",
      logoUrl: LufthansaEn,
      time: "9:45 AM - 11:45 AM",
      route: "CDG - DXB",
      duration: "7h 10min",
      stops: "Non stop",
    },
    return: {
      airline: "Lufthansa",
      flightCode: "AT 4334, Indigo • 6E 783",
      logoUrl: Emirates,
      time: "11:45 PM - 6:45 AM",
      route: "CDG - DXB",
      duration: "4h 10min",
      stops: "Non stop",
      isNextDay: true,
    },
  },
  {
    price: "AED 2,456.90",
    outboundDate: "Thu 25 Jun",
    returnDate: "Sat 2 Jul",
    outbound: {
      airline: "Emirates",
      flightCode: "AT 4334",
      logoUrl: Lufthansa,
      time: "9:45 AM - 11:45 AM",
      route: "CDG - DXB",
      duration: "2h 10min",
      stops: "Non stop",
    },
    return: {
      airline: "Lufthansa",
      flightCode: "AT 4334",
      logoUrl: Emirates,
      time: "11:45 PM - 6:45 AM",
      route: "DXB - CDG",
      duration: "4h 10min",
      stops: "2 stops",
      isNextDay: true,
      layover: "6h 32m in Lisbon, Paris",
    },
  },
];

const SidePanel: React.FC<{
  visible: boolean;
  onClose: () => void;
  journey?: Journey;
}> = ({ visible, onClose, journey }) => {
  if (!journey) return null;

  return (
    <div
      className={`fixed top-2 bottom-2 right-3 h-auto mb-2 w-auto bg-white shadow-lg transition-transform ${
        visible ? "transform-none" : "transform translate-x-full"
      }`}
    >
      <div className="w-[720px] h-full relative bg-white rounded-xl border-2 border-[#e6e8eb]">
        {/* Flight Details Title */}
        <div className="w-[504px] left-[28px] top-[80px] absolute text-black text-xl font-semibold font-['Neue Montreal'] leading-[27px] tracking-wide">
          Flight details
        </div>

        {/* Departure Date and Time */}
        <div className="left-[28px] top-[159px] absolute justify-start items-center gap-3 inline-flex">
          <div className="w-3 h-3 rounded-full border border-[#000c0b]" />
          <div className="text-[#777a7f] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
            Sat 28 Sept • 2:15
          </div>
        </div>

        {/* Second Date and Time Row */}
        <div className="left-[28px] top-[242px] absolute justify-start items-center gap-3 inline-flex">
          <div className="w-3 h-3 rounded-full border border-[#000c0b]" />
          <div className="text-[#777a7f] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
            Sat 28 Sept • 2:15
          </div>
        </div>

        {/* Third Date and Time Row */}
        <div className="left-[28px] top-[411px] absolute justify-start items-center gap-3 inline-flex">
          <div className="w-3 h-3 rounded-full border border-[#000c0b]" />
          <div className="text-[#777a7f] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
            Sat 28 Sept • 2:15
          </div>
        </div>

        {/* Fourth Date and Time Row */}
        <div className="left-[28px] top-[494px] absolute justify-start items-center gap-3 inline-flex">
          <div className="w-3 h-3 rounded-full border border-[#000c0b]" />
          <div className="text-[#777a7f] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
            Sat 28 Sept • 2:15
          </div>
        </div>

        {/* First Airport Name */}
        <div className="w-[206px] left-[52px] top-[180px] absolute text-[#001f1d] text-sm font-medium font-['Neue Montreal'] leading-[14px] tracking-tight">
          DXB • Dubai International Airport
        </div>

        {/* Second Airport Name */}
        <div className="w-[206px] left-[52px] top-[263px] absolute text-[#001f1d] text-sm font-medium font-['Neue Montreal'] leading-[18.90px] tracking-tight">
          RUH • King Khalid International Airport
        </div>

        {/* Third Airport Name */}
        <div className="w-[206px] left-[52px] top-[432px] absolute text-[#001f1d] text-sm font-medium font-['Neue Montreal'] leading-[18.90px] tracking-tight">
          RUH • King Khalid International Airport
        </div>

        {/* Fourth Airport Name */}
        <div className="w-[206px] left-[52px] top-[515px] absolute text-[#001f1d] text-sm font-medium font-['Neue Montreal'] leading-[14px] tracking-tight">
          CDG • Paris - Charles de Gualle Airport
        </div>

        {/* Layover Information */}
        <div className="left-[82px] top-[349px] absolute justify-start items-center gap-[9px] inline-flex">
          <div className="w-3.5 h-3.5 p-[0.58px] justify-center items-center flex" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <g clip-path="url(#clip0_2003_832)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.00395 1.74998C4.10445 1.74998 1.75395 4.10048 1.75395 6.99998C1.75395 9.89948 4.10445 12.25 7.00395 12.25C9.90344 12.25 12.2539 9.89948 12.2539 6.99998C12.2539 4.10048 9.90344 1.74998 7.00395 1.74998ZM0.58728 6.99998C0.58728 3.45615 3.46012 0.583313 7.00395 0.583313C10.5478 0.583313 13.4206 3.45615 13.4206 6.99998C13.4206 10.5438 10.5478 13.4166 7.00395 13.4166C3.46012 13.4166 0.58728 10.5438 0.58728 6.99998ZM7.00395 2.91665C7.32611 2.91665 7.58728 3.17781 7.58728 3.49998V6.63946L9.59816 7.6449C9.88631 7.78897 10.0031 8.13937 9.85903 8.42752C9.71495 8.71568 9.36456 8.83247 9.07641 8.6884L6.74307 7.52173C6.54545 7.42292 6.42061 7.22093 6.42061 6.99998V3.49998C6.42061 3.17781 6.68178 2.91665 7.00395 2.91665Z"
                fill="#787B80"
              />
            </g>
            <defs>
              <clipPath id="clip0_2003_832">
                <rect
                  width="14"
                  height="14"
                  fill="white"
                  transform="translate(0.00390625)"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="text-[#777a7f] text-sm font-normal font-['Neue Montreal'] leading-[14px] tracking-tight">
            Layover 2h 25m
          </div>
        </div>

        {/* First Flight Details */}
        <div className="left-[480px] top-[190px] absolute justify-start items-start gap-3.5 inline-flex">
          <div className="w-7 h-7 px-0.5 py-2 rounded-sm border border-[#e5e7ea] justify-center items-center flex">
            <Image className="w-6 h-3" src={Lufthansa} alt="logo" />
          </div>
          <div className="flex-col justify-center items-start gap-2 inline-flex">
            <div className="flex-col justify-start items-start gap-1.5 flex">
              <div className="text-[#47494c] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
                Saudi Arabian Airlines • SV553
              </div>
              <div className="text-[#47494c] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
                Economy • A330
              </div>
              <div className="text-[#47494c] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
                Flight time 3h 45m
              </div>
            </div>
          </div>
        </div>

        {/* Second Flight Details */}
        <div className="left-[480px] top-[446px] absolute justify-start items-start gap-3.5 inline-flex">
          <div className="w-7 h-7 px-0.5 py-2 rounded-sm border border-[#e5e7ea] justify-center items-center flex">
            <Image className="w-6 h-3" src={Lufthansa} alt="logo" />
          </div>
          <div className="flex-col justify-center items-start gap-2 inline-flex">
            <div className="flex-col justify-start items-start gap-1.5 flex">
              <div className="text-[#47494c] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
                Saudi Arabian Airlines • SV553
              </div>
              <div className="text-[#47494c] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
                Economy • A330
              </div>
              <div className="text-[#47494c] text-xs font-normal font-['Neue Montreal'] leading-3 tracking-tight">
                Flight time 3h 45m
              </div>
            </div>
          </div>
        </div>

        {/* Icon Top Left */}
        <div
          className="w-7 h-7 left-[28px] top-[28px] absolute"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <circle cx="14" cy="14" r="14" fill="#F5F7FA" />
            <path
              d="M12.5536 10C11.1513 11.037 9.89185 12.2485 8.80631 13.6038C8.71319 13.72 8.66663 13.86 8.66663 14M12.5536 18C11.1513 16.963 9.89185 15.7515 8.80631 14.3962C8.71319 14.28 8.66663 14.14 8.66663 14M8.66663 14H19.3333"
              stroke="#484A4D"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const SearchOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedFrom, setSelectedFrom] = useState<string>("Where from?");
  const [selectedTo, setSelectedTo] = useState<string>("Where to?");
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const today = new Date();

  const departureStr = departureDate ? format(departureDate, "yyyy-MM-dd") : "";
  const returnStr = returnDate ? format(returnDate, "yyyy-MM-dd") : "";

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
    <div className="w-full h-60 bg-white absolute flex justify-center items-center border-b">
      <div className="relative w-[1057px] h-[239px] px-7 py-6 bg-white rounded-xl flex-col justify-start items-center gap-8 inline-flex">
        <div className="self-stretch h-[120px] flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-start items-center gap-[572px] inline-flex">
            <div className="justify-start items-center gap-2 flex">
              <div className="h-9 px-3 py-2.5 bg-white rounded-md justify-center items-center gap-2 flex"></div>
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
                    fromDate={departureDate || today}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Link
              href={{
                pathname: "/results",
                query: {
                  from: selectedFrom,
                  to: selectedTo,
                  departure: departureStr,
                  return: returnStr,
                },
              }}
              onClick={onClose}
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

  const [selectedJourney, setSelectedJourney] = useState<Journey | undefined>(
    undefined
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  const openPanel = (journey: Journey) => {
    setSelectedJourney(journey);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedJourney(undefined);
  };

  const openSearchOverlay = () => {
    setIsSearchOverlayOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOverlayOpen(false);
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen relative">
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
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                onClick={openSearchOverlay}
              >
                <rect width="34" height="34" rx="17" fill="#E5EBEB" />
                <path
                  d="M23 23L20.1 20.1M21.6667 16.3333C21.6667 19.2789 19.2789 21.6667 16.3333 21.6667C13.3878 21.6667 11 19.2789 11 16.3333C11 13.3878 13.3878 11 16.3333 11C19.2789 11 21.6667 13.3878 21.6667 16.3333Z"
                  stroke="#003E39"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Close Button with Spacing */}
          <Link href={"/"}>
            <button className="mr-10 p-2 rounded-full border border-gray-300">
              <FiX className="text-gray-500 w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Result Section */}
      <div className="w-full max-w-6xl p-6 space-y-4">
        {/* Results Header */}
        <div className="text-gray-600">Showing 356 of 767 results</div>

        {/* Flight Card */}
        <div>
          {journeys.map((journey, index) => (
            <div
              key={index}
              onClick={() => openPanel(journey)}
              className="w-[1056px] h-[200px] relative bg-white rounded-[7px] border border-[#e5e7ea] mb-6 cursor-pointer"
            >
              {/* Outbound Flight Segment */}
              <div className="absolute left-[30px] top-[16px] text-[#777a7f] text-[13px] font-medium font-['Neue Montreal'] leading-[17.55px] tracking-wide">
                {journey.outboundDate}
              </div>
              <div className="w-11 h-11 px-0.5 py-[11px] left-[30px] top-[42px] absolute bg-white rounded border border-[#e6e8eb] flex justify-center items-center">
                <Image
                  className="w-10 h-[22px]"
                  src={journey.outbound.logoUrl}
                  alt={`${journey.outbound.airline} Logo`}
                />
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
                <Image
                  className="w-10 h-[22px]"
                  src={journey.return.logoUrl}
                  alt={`${journey.return.airline} Logo`}
                />
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

              <div className="absolute left-[858px] top-[108px] text-[#001f1d] text-xl font-normal font-['Neue Montreal'] leading-tight tracking-tight">
                {journey.price}
              </div>
              <div className="absolute left-[858px] top-[86px] text-[#777a7f] text-sm font-normal font-['Neue Montreal'] leading-[14px] tracking-wide">
                from
              </div>
              <div className="w-[182px] px-4 py-3 left-[858px] top-[144px] absolute bg-[#003e39] rounded-[7px] flex justify-center items-center gap-2">
                <div className="text-white text-base font-medium font-['Neue Montreal'] leading-none tracking-wide">
                  Select
                </div>
              </div>

              <div className="w-[200px] h-[0px] left-[842px] top-0 absolute origin-top-left rotate-90 border border-[#e5e7ea]"></div>
            </div>
          ))}
        </div>

        {/* Additional Flight Cards can be added here */}
      </div>
      {/* Side Panel */}
      <SidePanel
        visible={isPanelOpen}
        onClose={closePanel}
        journey={selectedJourney}
      />

      {isSearchOverlayOpen && <SearchOverlay onClose={closeSearchOverlay} />}
    </div>
  );
};

export default page;
