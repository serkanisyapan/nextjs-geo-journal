import TravelLogMap from '@/components/TravelLogMap';
import Head from 'next/head';
import SidebarForm from '@/components/SidebarForm';
import TravelLogProvider from '@/context/TravelLogProvider';
import SidebarLogs from '@/components/SidebarLogs';
import useFetchLogs from '@/hooks/useFetchLogs';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const { loading } = useFetchLogs();
  return (
    <>
      <Head>
        <title>Travel Log</title>
      </Head>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TravelLogProvider>
          <>
            <TravelLogMap />
            <SidebarForm />
            <SidebarLogs />
          </>
        </TravelLogProvider>
      )}
    </>
  );
}
