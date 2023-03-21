import { useState, useEffect } from 'react';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { getSession } from 'next-auth/react';

export default function useFetchLogs() {
  const [logs, setLogs] = useState<TravelLogTypeWithId[] | []>([]);

  const fetchData = async () => {
    const session = await getSession();
    if (!session) return;
    // @ts-ignore
    const response = await fetch(`/api/user-logs/${session.user?.id}`);
    const logsData = await response.json();
    setLogs(logsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { logs, setLogs };
}
