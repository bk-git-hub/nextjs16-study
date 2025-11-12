import Header from '../component/layouts/header';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center  bg-zinc-50 font-sans dark:bg-black'>
      <Header />
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        HomePage
      </main>
    </div>
  );
}
