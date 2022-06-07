import Image from 'next/image';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/AppBar.module.css';
import { useRouter } from "next/router";

export default function AppBar() {
    const router = useRouter();
    const user = {
        id:1,
        email:"pedro@gmail.com",
        password:"aloalo",
    };
    return (
        <div className={styles.AppBar}>
            <h1>CryptoWatchers - Crypto Dashboard</h1>
            <Dropdown
                caret="true"
                nav="true"
                onClick={(e) => e.preventDefault()}>
                <Dropdown.Toggle className={styles.profileDropdown} id="dropdown-basic">
                    <Image src="/perfil.png" alt="User" width={72} height={72}
                        className={`${styles.borderCircle}`} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => router.push({
                        pathname:'/portfolio',
                        query: user})}>
                        Portfolio
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}