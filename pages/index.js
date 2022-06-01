import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import AppBar from '../components/appbar';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';

function formatNumber(num) {
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 8 });
}

export default function Home({ data }) {
  const ref = useRef(null);
  console.log(data.data[0]);
  const scrollToMain = () => ref.current.scrollIntoView(true, { behavior: 'smooth' });

  return (
    <div className={styles.container}>
      <Head>
        <title>CryptoWatchers - Dashboard de cryptos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppBar></AppBar>
      <main className={styles.main}>
        <div className={`${styles.landingPage}`}>
          <div className={`${styles.landingContent}`}>
            <h2>Welcome to your crypto Dashboard!</h2>
            <Button style={{ fontWeight: 'bold' }} onClick={scrollToMain} variant='outline-light'>
              See the main cryptos.
            </Button>
          </div>
        </div>
        <div style={{ marginTop: '0.5rem' }} ref={ref}>
          <h2 style={{ marginTop: '1.5rem' }}><b>Main cryptos: </b></h2>
          <div className={styles.styleCenter}>
            {data.data.slice(0, 20).map(item => (
              <div className={`${styles.glass} ${styles.card}`} key={`Item__${item.id}`}>
                <h3>{item.name} ({item.symbol})</h3>
                <p>{formatNumber(parseFloat(item.priceUsd))}</p>
                <p style={{ color: (item.changePercent24Hr > 0) ? 'green' : 'red', }}>
                  {parseFloat(item.changePercent24Hr).toFixed(2)} %
                </p>
                <Link href={`crypto/${item.id}`}>
                  <Button variant="outline-light">See details</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://github.com/insper-tecnologias-web/projeto-3-crypto-watcher-front"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' GRPG'}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div >
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://api.coincap.io/v2/assets', { Authorization: process.env.API_KEY });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
