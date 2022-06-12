import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function formatNumber(num) {
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 8 });
}

export default function MainCryptosCard({ allCoins }) {

    const TrendArrow = ({ change }) => {
        if (change > 0) {
            return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
            </svg>);
        } else if (change < 0) {
            return (<svg style={{}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
            </svg>);
        }
    }

    return (
        <div className={styles.mainCryptosCard}>
            {allCoins.slice(0, 20).map(item => (
                <div className={`${styles.glass} ${styles.card}`} key={`Item__${item.id}`}>
                    <h3 style={{ marginTop: '0.7rem', alignSelf: 'center' }}>{item.name} ({item.symbol})</h3>
                    <p className={styles.percentChange}
                        style={{ color: (item.changePercent24Hr > 0) ? 'green' : 'red' }}>
                        <TrendArrow change={item.changePercent24Hr} />
                        {Math.abs(parseFloat(item.changePercent24Hr).toFixed(2))} %
                    </p>
                    <p>{formatNumber(parseFloat(item.priceUsd))}</p>
                    <Link href={`crypto/${item.id}`}>
                        <Button variant="outline-light">See details</Button>
                    </Link>
                </div>
            ))}
        </div>
    )
}