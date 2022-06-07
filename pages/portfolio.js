import AppBar from '../components/appbar';
import Linha from '../components/linha';
import styles from '../styles/portfolio.module.css';
import { useRouter } from "next/router"
import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'

export default function Userportfolio({cryptos}) {
    const router = useRouter();
    const user = router.query;
    const [cryptosN, setCryptosN] = useState([]);
    const [cryptovalues, setCryptovalues] = useState([]);

    const loadCryptovalues = () => {
        for (var obj of cryptos) {
            let name = obj.crypto;
            fetch('https://api.coincap.io/v2/assets/' + name, 
            { Authorization: "Bearer " + process.env.API_KEY })
            .then(res => res.json())
            .then(res => cryptovalues.push(res.data));            
        }
        console.log(cryptovalues);
    }
    
    useEffect(()=>{
        loadCryptovalues();
    },[]);

    return (
        <div>
            <AppBar></AppBar>
            <div>
                <h1>Portfolio do {user.email}</h1>
            </div>
            <div className={styles.divTable}>
                <div className={styles.headRow}>
                    <h3>ID</h3>
                    <h3>Ticker</h3>
                    <h3>Quantity</h3>
                    <h3>Details</h3>
                </div>
             </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query,params, req, res } = context;
    //com o query pegar o id e colocar na url para buscar os objetos crypto que pertencem a esse usuario
    // const aws = await fetch("http://localhost:8000/api/notes/") //vai dar errado
    // const cryptos = await aws.json() //vai dar errado
    const cryptos = [
        {
            index_cryptos_on_user_id:1,
            user_id:1,
            crypto:"bitcoin",
            quantity: 0.1,
            notes:"comprar novamente em epoca de baixa",
        },
        {
            index_cryptos_on_user_id:2,
            user_id:1,
            crypto:"ethereum",
            quantity: 0.1,
            notes:"Cornfield chase",
        },
    ]


    return {
        props: { cryptos }, // will be passed to the page component as props
    }
}