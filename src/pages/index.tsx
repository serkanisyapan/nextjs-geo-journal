import LoadingSpinner from '@/components/LoadingSpinner';
import TravelLogMap from '@/components/TravelLogMap';
import useFetchLogs from '@/hooks/useFetchLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import Head from 'next/head';
import SidebarForm from '@/components/SidebarForm';
import TravelLogProvider from '@/context/TravelLogProvider';

interface LogsType {
  logs: TravelLogTypeWithId[];
  loading: boolean;
}

export default function Home() {
  const { logs, loading }: LogsType = useFetchLogs();

  return (
    <>
      <Head>
        <title>Travel Log</title>
      </Head>
      <TravelLogProvider>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <TravelLogMap logs={logs} />
            <SidebarForm />
          </>
        )}
      </TravelLogProvider>
    </>
  );
}
