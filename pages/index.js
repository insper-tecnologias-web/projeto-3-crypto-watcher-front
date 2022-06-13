import Head from 'next/head';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import AppBar from '../components/appbar';
import Footer from '../components/footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import MainCryptosCard from '../components/mainCryptosCard';


export default function Home({ data }) {
  const [userLog, setUserLog] = useState(false);
  const ref = useRef(null);
  const scrollToMain = () => ref.current.scrollIntoView(true, { behavior: 'smooth' });
  const allCoins = data.data;
  const router = useRouter();


  useEffect(() => {
    setUserLog(window.sessionStorage.getItem('userToken'));
  }, [router.query.slug, userLog]);

  return (
    <div className={styles.container}>
      <Head>
        <title>CryptoWatchers - Dashboard de cryptos</title>
        <meta name="description" content="Crypto dashboard" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppBar userLogged={userLog}></AppBar>
      <main className={styles.main}>
        <div className={`${styles.landingPage}`}>
          <div className={`${styles.landingContent}`}>
            <h2>Welcome to your crypto Dashboard!</h2>
            <div className={styles.landingButtons}>
              <Button style={{ margin: '1rem 1.5rem 1.5rem 0rem', fontWeight: 'bold' }} onClick={scrollToMain} variant='outline-light'>
                See the main cryptos
              </Button>
              <Button style={{ margin: '1rem 0rem 1.5rem 0rem', fontWeight: 'bold' }}
                onClick={() => router.push(userLog ? '/portfolio' : '/login')} variant='outline-light'>
                See your portfolio
              </Button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '0.5rem' }} ref={ref}>
          <h2 style={{ marginTop: '1.5rem' }}><b>Main cryptos: </b></h2>
          <div className={styles.styleCenter}>
            <MainCryptosCard allCoins={allCoins}></MainCryptosCard>
          </div>
        </div>
      </main >
      <Footer></Footer>
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
