import dynamic from 'next/dynamic'
const StockChart = dynamic(() => import("/lib/StockChart/StockChart"), { ssr: false })
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'


export default function CryptoPage({ currency }) {
  const [valores, setValores] = useState([])
  const router = useRouter()
  const cripto = router.query.cid
  const [symbol, setSymbol] = useState('')
  useEffect(() => {
    let listValues = []
    for (let value of currency) {
      listValues.push({
        x: new Date(moment(value.time).format("YYYY-MM-DD").toString()),
        y: parseFloat(value.priceUsd)
      })
    }
    setValores(listValues)
    fetch('https://api.coincap.io/v2/assets/'+cripto, {Authorization: "Bearer "+process.env.API_KEY}).then(res => res.json()).then(res=>setSymbol(res.data.symbol));
  }, [])

  return (
    <>
      <h2>
        <StockChart title={symbol} dataPoints={valores} />
      </h2>
    </>
  )
}

export async function getStaticPaths() {
  const currencies = await fetch('https://api.coincap.io/v2/assets', {Authorization: "Bearer "+process.env.API_KEY}).then(res => res.json());
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
  const results = await fetch(`https://api.coincap.io/v2/assets/${currencyId}/history?interval=d1`, {Authorization:"Bearer "+ process.env.API_KEY}).then(res => res.json());
  return {
    props: {
      currency: results.data
    }
  }
}