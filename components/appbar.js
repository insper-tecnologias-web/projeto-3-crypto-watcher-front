import Image from 'next/image';
import styles from '../styles/AppBar.module.css';
import { useRouter } from "next/router";


export default function AppBar({ userLogged }) {
    const router = useRouter();
    const pathName = userLogged ? '/portfolio' : '/login';

    return (
        <div className={styles.AppBar}  >
            <div className={styles.AppBar_logo} onClick={() => router.push('/')}>
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <h1 className={styles.AppBar_title}>CryptoWatchers</h1>
            </div>
            <div className={styles.AppBar_wallet} onClick={() => router.push({
                pathname: pathName,
            })}>
                {(router.pathname !== '/portfolio' && userLogged) &&
                    <Image src="/carteira.png" alt="Wallet" width={50} height={50} />}
                {!userLogged &&
                    <Image src="/perfil.png" alt="Wallet" width={50} height={50} className={styles.borderCircle} />}
            </div>
        </div>
    );
}