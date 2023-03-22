import VisitLogs from '@/components/UserProfile/ProfileMap';
import Head from 'next/head';

interface Props {
  username: string;
}

export default function UserLogs({ username }: Props) {
  return (
    <>
      <Head>
        <title>{username} logs - Geo Journal</title>
      </Head>
      <VisitLogs username={username} />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { username } = context.query;
  return {
    props: {
      username,
    },
  };
};
