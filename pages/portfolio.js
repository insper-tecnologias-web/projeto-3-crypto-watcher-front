import Link from "next/link"
import { useRouter } from "next/router"
import styles from '../styles/Home.module.css'

export default function Portfolio(params) {
    const router = useRouter()
    const { 
        query: { username }
    } = router

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <link href="/login">
                    <p>PERFIL</p>
                </link>
            </div>
            <div>
                <h1>Portfolio</h1>

            </div>

        </div>
    )
}