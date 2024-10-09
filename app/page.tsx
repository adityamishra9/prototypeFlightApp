// pages/index.js

import Head from 'next/head';
import FlightSearchForm from '../components/flightSearchForm/flightSearchForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Flight Search</title>
      </Head>
      <main className="flex justify-center items-center min-h-screen">
        <FlightSearchForm />
      </main>
    </div>
  );
}
