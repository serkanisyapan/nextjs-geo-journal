import TravelLogMap from '@/components/TravelLogMap';
import Head from 'next/head';
import SidebarForm from '@/components/SidebarForm';
import TravelLogProvider from '@/context/TravelLogProvider';
import SidebarLogs from '@/components/SidebarLogs';
import UserInfo from '@/components/UserInfo';
import { useSession } from 'next-auth/react';
import Login from './login';

export default function Home() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    return <Login />;
  }
  return (
    <>
      <Head>
        <title>Travel Log</title>
      </Head>
      <TravelLogProvider>
        <>
          <UserInfo />
          <TravelLogMap />
          <SidebarForm />
          <SidebarLogs />
        </>
      </TravelLogProvider>
    </>
  );
}
