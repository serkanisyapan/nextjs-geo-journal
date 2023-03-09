import { ChangeEvent, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import TravelLogMap from '@/components/TravelLogMap';
import useFetchLogs from '@/hooks/useFetchLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import Head from 'next/head';
import SidebarForm from '@/components/SidebarForm';
import TravelLogProvider from '@/context/TravelLogProvider';
import SidebarLogs from '@/components/SidebarLogs';

interface LogsType {
  logs: TravelLogTypeWithId[];
  loading: boolean;
}

export default function Home() {
  const [filterLogs, setFilterLogs] = useState<string>('');
  const { logs, loading }: LogsType = useFetchLogs();

  const filteredLogs = logs.filter((log) => {
    if (filterLogs === 'Visited') {
      return log.visited === 'Yes';
    }
    if (filterLogs === 'Not Visited') {
      return log.visited === 'No';
    }
    return log;
  });

  const handleFilterLogs = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterLogs(event.target.value);
  };

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
            <TravelLogMap logs={filteredLogs} />
            <SidebarForm />
            <SidebarLogs
              logs={filteredLogs}
              handleFilterLogs={handleFilterLogs}
              filterLogs={filterLogs}
            />
          </>
        )}
      </TravelLogProvider>
    </>
  );
}
