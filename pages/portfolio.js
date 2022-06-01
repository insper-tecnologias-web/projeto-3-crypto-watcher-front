import AppBar from '../components/appbar';
import Linha from '../components/linha';
import styles from '../styles/portfolio.module.css';

export default function Userportfolio() {
    // const router = useRouter();
    // const {name,data} = router.query;
    // const userData = JSON.parse(data);
    // console.log(userData);
    const name = 'Pedro';
    const hardcode = [
        {
            id: 1,
            ticker: 'BTC',
            name: 'bitcoin',
            quant: 0.00002
        },
        {
            id: 2,
            ticker: 'SOL',
            name: 'solana',
            quant: 0.00089
        },
        {
            id: 3,
            ticker: 'ETH',
            name: 'ethreum',
            quant: 0.00082
        },
    ];

    return (
        <div>
            <AppBar></AppBar>
            <div style={{ marginTop: '1rem' }}>
                <h1>Portfolio do {name}</h1>
            </div>
            <div className={styles.divTable}>
                <div className={styles.headRow}>
                    <h3>ID</h3>
                    <h3>Ticker</h3>
                    <h3>Quantidade</h3>
                    <h3>Detalhes</h3>
                </div>
                <div class="rows">
                    {hardcode.map((coin) => (
                        <Linha key={`coin__${coin.id}`} props={coin}></Linha>
                    ))}
                </div>
            </div>
        </div>
    )
}