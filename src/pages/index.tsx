import TravelLogMap from '@/components/TravelLogMap';
import Head from 'next/head';
import SidebarForm from '@/components/SidebarForm';
import TravelLogProvider from '@/context/TravelLogProvider';
import SidebarLogs from '@/components/SidebarLogs';
import useFetchLogs from '@/hooks/useFetchLogs';
import LoadingSpinner from '@/components/LoadingSpinner';
import UserSession from '@/components/UserSession';
import { useSession } from 'next-auth/react';
import Login from './login';

export default function Home() {
  const { loading } = useFetchLogs();
  const { status } = useSession();
  if (status === 'unauthenticated') {
    return <Login />;
  }
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
            <UserSession />
            <TravelLogMap />
            <SidebarForm />
            <SidebarLogs />
          </>
        </TravelLogProvider>
      )}
    </>
  );
}
