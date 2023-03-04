import TravelLogForm from '@/components/TravelLogForm';
import useFetchLogs from '@/hooks/useFetchLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';

interface LogsType {
  logs: TravelLogTypeWithId[];
  loading: boolean;
}

export default function Home() {
  const { logs, loading }: LogsType = useFetchLogs();

  return (
    <>
      <main>
        <TravelLogForm />
        {loading && <span>Loading...</span>}
        {logs.map((log) => (
          <span className="flex flex-col gap-2" key={log._id.toString()}>
            {log.title}
          </span>
        ))}
      </main>
    </>
  );
}
// 3:40:45 Mapbox config
