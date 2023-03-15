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
  setLogs: (logs: TravelLogTypeWithId[]) => void;
}

export default function Home() {
  const [filterLogs, setFilterLogs] = useState<string>('');
  const { logs, setLogs, loading }: LogsType = useFetchLogs();

  const handleFilterLogs = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterLogs(event.target.value);
  };

  const handleUpdateLog = (data: TravelLogTypeWithId) => {
    const updateLogs = logs.map((log) => {
      if (log._id === data._id) {
        return { ...data };
      }
      return log;
    });
    setLogs(updateLogs);
  };

  const handleDeleteLog = (logID: string) => {
    const deleteLog = logs.filter((log) => log._id.toString() !== logID);
    setLogs(deleteLog);
  };

  const filteredLogs = logs.filter((log) => {
    if (filterLogs === 'Visited') {
      return log.visited === 'Yes';
    }
    if (filterLogs === 'Not Visited') {
      return log.visited === 'No';
    }
    return log;
  });

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
            <TravelLogMap
              handleDeleteLog={handleDeleteLog}
              handleUpdateLog={handleUpdateLog}
              logs={filteredLogs}
            />
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
