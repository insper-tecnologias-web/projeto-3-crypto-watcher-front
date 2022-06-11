import AppBar from '../components/appbar';
import styles from '../styles/portfolio.module.css';
import { useRouter } from "next/router"
import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Link from 'next/link';


export default function Userportfolio(props) {
	const router = useRouter();
	const user = router.query;
	const userCoins = props.cryptos;
	const allCryptos  = props.allCryptos;

	for (let i=0;i<userCoins.length;i++) {
		let obj = userCoins[i];
		let itemObj = allCryptos[i]['data'];
		obj['priceUsd'] = itemObj['priceUsd'];
		obj['symbol'] = itemObj['symbol'];
		obj['changePercent24Hr'] = itemObj['changePercent24Hr'];
	}
	
	return (
		<div>
			<AppBar></AppBar>
			<h1>{user.email} cryptocurrency portfolio</h1>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
					<th>#</th>
					<th>Ticker</th>
					<th>Name</th>
					<th>Quantity</th>
					<th>price Usd</th>
					<th>buying_price</th>
					<th>changePercent24Hr</th>
					<th>Details</th>
					<th>#</th>
					</tr>
				</thead>
				<tbody>
					{userCoins.map((coin)=>(
							<tr key={coin.id}>
								<td>{coin.id}</td>
								<td>{coin.symbol}</td>
								<td>{coin.crypto}</td>
								<td>{parseFloat(coin.quantity).toFixed(2)}</td>
								<td>{parseFloat(coin.priceUsd).toFixed(2)}</td>
								<td>{coin.buying_price}</td>
								<td>{parseFloat(coin.changePercent24Hr).toFixed(2)} %</td>
								<td>{coin.notes}</td>
								<td>
									<Link href={`crypto/${coin.crypto}`}>
									<Button variant="outline-light">See details</Button>
								</Link>
								</td>
							</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { query, params, req } = context;
	// vai pegar as cryptos do usuario X e as cryptos gerais
	const cryptos = [
	{
			"id": 4,
			"user_id": 2,
			"crypto": "bitcoin",
			"buying_price": 30000.0,
			"quantity": 1,
			"notes": "Teste",
			"created_at": "2022-06-07T01:31:15.243Z",
			"updated_at": "2022-06-07T01:31:15.243Z"
	},
	{
			"id": 5,
			"user_id": 2,
			"crypto": "ethereum",
			"buying_price": 30000.0,
			"quantity": 1,
			"notes": "Teste",
			"created_at": "2022-06-07T01:31:15.253Z",
			"updated_at": "2022-06-07T01:31:15.253Z"
	},
	{
			"id": 6,
			"user_id": 2,
			"crypto": "litecoin",
			"buying_price": 20000.0,
			"quantity": 10,
			"notes": "Teste",
			"created_at": "2022-06-07T01:31:15.274Z",
			"updated_at": "2022-06-07T01:31:15.274Z"
	}];
	//const userres = await fetch("backend",{informacoes outras});
	//const cryptos = await userres.json();
	const allCryptos = await Promise.all(
		cryptos.map((res)=>
			fetch('https://api.coincap.io/v2/assets/' + res.crypto, { Authorization: "Bearer " + process.env.API_KEY })
			.then((response)=>response.json())
		)
	);
	

	return {
		props: { cryptos, allCryptos }
	}
}