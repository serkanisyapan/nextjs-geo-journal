import TravelLogMap from '@/components/TravelLogMap';
import Head from 'next/head';
import SidebarForm from '@/components/SidebarForm';
import TravelLogProvider from '@/context/TravelLogProvider';
import SidebarLogs from '@/components/SidebarLogs';
import UserInfo from '@/components/UserInfo';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Login from './login';

export default function Home() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    return <Login />;
  }
  return (
    <>
      <Head>
        <title>Geo Journal</title>
      </Head>
      <TravelLogProvider>
        <UserInfo />
        <TravelLogMap />
        <SidebarForm />
        <SidebarLogs />
      </TravelLogProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};
