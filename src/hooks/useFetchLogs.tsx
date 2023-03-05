import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useFetchLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch('/api/logs')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      });
  }, [router.query]);

  return { logs, loading };
}
