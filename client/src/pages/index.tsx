import Link from 'next/link';
import Header from '@/components/Header';
import Feature from '@/components/Feature';
import TopBar from '@/components/TopBar';

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <Feature />
    </>
  );
}
