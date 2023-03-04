import TravelLogMap from '@/components/TravelLogMap';
import useFetchLogs from '@/hooks/useFetchLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import Head from 'next/head';

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
      <main>
        {loading ? <h3>Loading...</h3> : <TravelLogMap logs={logs} />}
      </main>
    </>
  );
}
