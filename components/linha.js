import styles from '../styles/portfolio.module.css';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

export default function Linha(props){
    const coin = props.props;
    console.log(coin);
    return (
        <div className={`${styles.glass} ${styles.card}`}>
            <p>{coin.id}</p>
            <p>{coin.ticker}</p>
            <p>{coin.quant}</p>
            <Link href={`crypto/${coin.name}`}>
                <Button variant="outline-light">See details</Button>
            </Link>
        </div>
    )
}

