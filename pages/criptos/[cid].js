import dynamic from 'next/dynamic'
const StockChart = dynamic(() => import("/lib/StockChart/StockChart"), { ssr: false })
import React, { useEffect, useState } from 'react'
import moment from 'moment'



export default function CryptoPage({ currency }) {
  const [valores, setValores] = useState([])

  useEffect(() => {
    let listValues = []
    for (let value of currency) {
      listValues.push({
        x: new Date(moment(value.time).format("YYYY-MM-DD").toString()),
        y: parseFloat(value.priceUsd)
      })
    }
    setValores(listValues)
  }, [])
  console.log(valores)
  console.log(moment(currency[0].time).format("YYYY-MM-DD"))

  return (
    <>
      <h2>
        <StockChart dataPoints={valores} />
      </h2>
    </>
  )
}

export async function getStaticPaths() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    Authorization: "Bearer a3500fc0-6930-4cd0-9546-e31b3fec9ebb"
  };
  const currencies = await fetch('https://api.coincap.io/v2/assets', requestOptions).then(res => res.json());
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
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    Authorization: "Bearer a3500fc0-6930-4cd0-9546-e31b3fec9ebb"
  };
  const currencyId = params.cid
  const results = await fetch(`https://api.coincap.io/v2/assets/${currencyId}/history?interval=d1`, requestOptions).then(res => res.json());
  return {
    props: {
      currency: results.data
    }
  }
}