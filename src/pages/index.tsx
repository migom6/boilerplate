import Head from 'next/head'
import Test from 'src/components/test'
export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Test />
    </div>
  )
}
