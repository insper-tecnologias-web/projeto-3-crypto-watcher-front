import Head from 'next/head';
import dynamic from 'next/dynamic'
const StockChart = dynamic(() => import("/lib/StockChart/StockChart"), { ssr: false })
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import styles from '../../styles/crypto.module.css'
import AppBar from '../../components/appbar';


export default function CryptoPage({ currency }) {
  const [values, setValues] = useState([])
  const router = useRouter()
  const cripto = router.query.cid
  const [cryptoData, setCrytoData] = useState('')
  const [symbol, setSymbol] = useState('')
  useEffect(() => {
    let listValues = []
    for (let value of currency) {
      listValues.push({
        x: new Date(moment(value.time).format("YYYY-MM-DD").toString()),
        y: parseFloat(value.priceUsd)
      })
    }
    setValues(listValues)
    fetch('https://api.coincap.io/v2/assets/' + cripto, { Authorization: "Bearer " + process.env.API_KEY })
      .then(res => res.json())
      .then(res => {
        setCrytoData(res.data)
        setSymbol(res.data.symbol)
      });
  }, [])

  return (
    <div>
      <Head>
        <title>CryptoWatchers - {cryptoData.name}</title>
        <meta name="description" content={cryptoData.name} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppBar></AppBar>
      <div className={styles.container}>
        <div className={styles.chart}>
          <StockChart title={symbol} dataPoints={values} />
        </div>
        <div className={styles.info}>
          <div className={styles.info_title}>
            <h2 style={{ marginTop: 0 }}>{cryptoData.name}</h2>
            <h4> Balance:</h4>
            <h5> 10 {cryptoData.symbol}</h5>
            <p style={{color: "rgb(177, 177, 177)"}}> ≈ $ 10</p>
          </div>
          <div className={styles.info_content}>
            <div className={styles.info_content_item}>
              <h4 className={styles.info_content_title}>Price USD:</h4>
              <p className={styles.info_content_value}>$ {(Math.round(cryptoData.priceUsd * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <h4 className={styles.info_content_title}>Price Change 24h:</h4>
              <p style={{ color: cryptoData.changePercent24Hr > 0 ? 'green' : 'red', fontWeight: '700' }}>
                {(Math.round(cryptoData.changePercent24Hr * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%
              </p>
              <h4 className={styles.info_content_title}>Volume USD 24h:</h4>
              <p className={styles.info_content_value}>$ {(Math.round(cryptoData.volumeUsd24Hr * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <h4 className={styles.info_content_title}>Market Cap USD:</h4>
              <p className={styles.info_content_value}>$ {(Math.round(cryptoData.marketCapUsd * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const currencies = await fetch('https://api.coincap.io/v2/assets', { Authorization: "Bearer " + process.env.API_KEY }).then(res => res.json());
  const paths = currencies.data.map(currency => {
    const currencyId = currency.id.toLowerCase();
    return {
      params: {
        cid: currencyId
      }
    }
  });
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const currencyId = params.cid
  const results = await fetch(`https://api.coincap.io/v2/assets/${currencyId}/history?interval=d1`, { Authorization: "Bearer " + process.env.API_KEY }).then(res => res.json());
  return {
    props: {
      currency: results.data
    }
  }
}