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

export default function Userportfolio({allCryptos}) {
	const router = useRouter();
	const allCoins = allCryptos.data;
	const [userLog, setUserLog] = useState(false);
	const [buyingprice,setBuyingprice] = useState(0);
	const [lista,setLista] = useState([]);
	const [name,setName] = useState("");
	const [quantity,setQuantity] = useState(0);
	const [notes,setNotes] = useState("");


	let allCoinsbetter = {}
	for (let a of allCoins) {
		let name = a.id;
		allCoinsbetter[name] = a
	}

	useEffect(()=>{
		setUserLog(window.sessionStorage.getItem('userToken'));
	},[router.query.slug, userLog])

	useEffect(()=>{
		if (userLog){
			axios.get('https://cryptic-bastion-47088.herokuapp.com/api/cryptos/',{
				headers:{Authorization:"Token "+userLog}
			}).then(response=>{
				console.log(response)
				let u = []
				for (let moeda of response.data){
					if (Object.keys(allCoinsbetter).indexOf(moeda.crypto_id)!==-1){
						u.push({
							moedauser:moeda,
							dadosapi:allCoinsbetter[moeda.crypto_id],
						})
					}
				}
				setLista(u)
			})
		}
	},[userLog]);
		

	const handleNameChange = (event) => {
		let cryname = event.target.value;
		console.log(cryname)
		setName(cryname);
	};

	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};

	const handleNotesChange=(event)=>{
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
		const url = 'https://cryptic-bastion-47088.herokuapp.com/api/cryptos/';
		const data = {
			crypto_id: name,
			quantity: quantity,
			buying_price : buyingprice,
			notes: notes,
		};
		const headers = {
			'Content-Type' : 'application/json',
			Authorization:"Token "+ userLog
		}
		await axios.post(url, data, {headers:headers}).then((response) => {
			router.push("/");
		}).catch((error) => {
			if (error.response.status === 403) {
				alert("Invalid");
			}
		});
	};

	return (
		<div>
			<AppBar></AppBar>
			<h1> cryptocurrency portfolio</h1>
			<div className={styles.container}>
				<Table striped bordered hover variant="dark">
					<thead>
							<tr>
								<th>Ranking</th>
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
						{lista.map((coin)=>(
							<tr key={coin.moedauser.id}>
								<td>{coin.dadosapi.rank}</td>
								<td>{coin.dadosapi.symbol}</td>
								<td>{coin.moedauser.crypto_id}</td>
								<td>{coin.moedauser.quantity}</td>
								<td>{coin.dadosapi.priceUsd}</td>
								<td>{coin.moedauser.buying_price}</td>
								<td>{parseFloat(coin.dadosapi.changePercent24Hr).toFixed(2)} %</td>
								<td>{coin.moedauser.notes}</td>
								<td>
									<Link href={`crypto/${coin.moedauser.crypto_id}`}>
										<Button variant="outline-light">See details</Button>
									</Link>
								</td>
						</tr>
						))}
					</tbody>
				</Table>
				
				<Form className={styles.formContainer}>
					<Form.Group>
						<Form.Label>
							Cryptocurrency name:
						</Form.Label>
						<InputGroup>
							<Form.Control onChange={handleNameChange} type="text" placeholder="Enter cryptocurrency name" />
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Quantity:
						</Form.Label>
						<InputGroup>
							<Form.Control onChange={handleQuantityChange} type="number" placeholder="Enter quantity" />
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Buying price:
						</Form.Label>
						<InputGroup>
							<Form.Control onChange={handleBuyingpriceChange} type="number" placeholder="Enter buying price" />
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Notes:
						</Form.Label>
						<InputGroup>
							<Form.Control onChange={handleNotesChange} type="text" placeholder="Enter notes" />
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
	
	const allCryptos = await fetch('https://api.coincap.io/v2/assets/', { Authorization: "Bearer " + process.env.API_KEY }).then((response)=>response.json())

	return {
		props: { allCryptos }
	}
}