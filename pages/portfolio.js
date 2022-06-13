import AppBar from '../components/appbar';
import { useRouter } from "next/router"
import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from '../styles/portfolio.module.css';
import Head from 'next/head';

export default function Userportfolio({ allCryptos }) {
	const router = useRouter();
	const allCoins = allCryptos.data;
	const [userLog, setUserLog] = useState(false);
	const [buyingprice, setBuyingprice] = useState(0);
	const [lista, setLista] = useState([]);
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [notes, setNotes] = useState("");
	const [userName, setUserName] = useState("");


	let allCoinsbetter = {}
	for (let a of allCoins) {
		let name = a.id;
		allCoinsbetter[name] = a
	}
	const integrateBackAndAPI = (response) => {
		let u = [];
		for (let moeda of response.data) {
			if (Object.keys(allCoinsbetter).indexOf(moeda.crypto_id) !== -1) {
				u.push({
					moedauser: moeda,
					dadosapi: allCoinsbetter[moeda.crypto_id],
				})
			}
		}
		return u;
	}

	useEffect(() => {
		setUserLog(window.sessionStorage.getItem('userToken'));
		setUserName(window.sessionStorage.getItem('username'));
	}, [router.query.slug, userLog])

	useEffect(() => {
		if (userLog) {
			axios.get('https://cryptic-bastion-47088.herokuapp.com/api/cryptos/', {
				headers: { Authorization: "Token " + userLog }
			}).then(response => {
				let u = integrateBackAndAPI(response);
				setLista(u);
			})
		}
	}, [userLog]);


	const handleNameChange = (event) => {
		let cryname = event.target.value;
		setName(cryname);
	};

	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};

	const handleNotesChange = (event) => {
		setNotes(event.target.value);
	}

	const handleBuyingpriceChange = (event) => {
		setBuyingprice(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!name || !quantity || !notes) {
			alert('Please fill in all fields');
			return;
		}
		// Validate the crypto name
		if (!Object.keys(allCoinsbetter).includes(name.toLowerCase())) {
			alert('Invalid crypto name');
			return;
		}
		const url = 'https://cryptic-bastion-47088.herokuapp.com/api/cryptos/';
		const data = {
			crypto_id: name.toLowerCase(),
			quantity: quantity,
			buying_price: buyingprice,
			notes: notes,
		};
		const headers = {
			'Content-Type': 'application/json',
			Authorization: "Token " + userLog
		}
		await axios.post(url, data, { headers: headers }).then((response) => {
			let u = integrateBackAndAPI(response);
			setLista(u);
		}).catch((error) => {
			if (error.response.status === 403) {
				alert("Invalid crypto");
			}
		});
	};

	return (
		<div>
			<Head>
				<title>CryptoWatchers - Portfolio</title>
				<meta name="description" content="Portfolio page of the crypto dashboard" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<AppBar></AppBar>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				{userName && <h1>{userName}{"'s"} portfolio</h1>}
				<Button style={{ marginLeft: '2rem' }} variant="danger" onClick={() => {
					window.sessionStorage.removeItem('userToken');
					window.sessionStorage.removeItem('username');
					router.push("/");
				}}>
					Log out
				</Button>
			</div>
			<div className={styles.container}>
				<Table style={{ margin: '1rem 0.5rem 2rem 0.5rem' }} striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Ranking</th>
							<th>Ticker</th>
							<th>Name</th>
							<th>Paid amount(usd)</th>
							<th>Price now(Usd)</th>
							<th>Change in 24h(%)</th>
							<th>Profit(Usd)</th>
							<th>Details</th>
							<th>#</th>
						</tr>
					</thead>
					<tbody>
						{lista.map((coin) => {
							let profit = (coin.dadosapi.priceUsd * coin.moedauser.quantity - coin.moedauser.buying_price * coin.moedauser.quantity);
							let profitFormatted = Math.abs(profit) < 1 ? profit : (Math.round(profit * 1000) / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							let paidAmount = coin.moedauser.buying_price * coin.moedauser.quantity;
							paidAmount = Math.abs(paidAmount) < 1 ? paidAmount : (Math.round(paidAmount * 1000) / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							return (
								<tr key={coin.moedauser.id}>
									<td>{coin.dadosapi.rank}</td>
									<td>{coin.dadosapi.symbol}</td>
									<td>{coin.moedauser.crypto_id}</td>
									<td>{paidAmount}</td>
									<td>
										{coin.dadosapi.priceUsd < 1 ?
											(coin.dadosapi.priceUsd) :
											(Math.round(coin.dadosapi.priceUsd * 1000) / 1000)
												.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									</td>
									<td style={{ color: (profit > 0 ? "green" : "red") }}>{parseFloat(coin.dadosapi.changePercent24Hr).toFixed(2)} %</td>
									<td style={{ color: (profit > 0 ? "green" : "red") }}>{profitFormatted}</td>
									<td>{coin.moedauser.notes}</td>
									<td>
										<Link href={`/crypto/${coin.moedauser.crypto_id}`}>
											<Button variant="outline-light">See details</Button>
										</Link>
									</td>
								</tr>
							)
						}
						)}
					</tbody>
				</Table>

				<Form className={styles.formContainer}>
					<h2>Add a crypto to your portfolio</h2>
					<Form.Group>
						<Form.Label>
							Cryptocurrency name:
						</Form.Label>
						<InputGroup>
							<Form.Control className={styles.inputStyle}
								onChange={handleNameChange} type="text" placeholder="Enter cryptocurrency name" />
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Quantity:
						</Form.Label>
						<InputGroup>
							<Form.Control className={styles.inputStyle}
								onChange={handleQuantityChange} type="number" placeholder="Enter quantity" />
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Buying price:
						</Form.Label>
						<InputGroup>
							<Form.Control className={styles.inputStyle}
								onChange={handleBuyingpriceChange} type="number" placeholder="Enter buying price" />
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Notes:
						</Form.Label>
						<InputGroup>
							<Form.Control className={styles.inputStyle}
								onChange={handleNotesChange} type="text" placeholder="Enter notes" />
						</InputGroup>
					</Form.Group>
					<Button onClick={handleSubmit} style={{ marginTop: '1rem' }} variant="primary" type="submit">
						Adicionar
					</Button>
				</Form>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { query, params, req } = context;

	const allCryptos = await fetch('https://api.coincap.io/v2/assets/', { Authorization: "Bearer " + process.env.API_KEY }).then((response) => response.json())

	return {
		props: { allCryptos }
	}
}