import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/LoginPage.module.css';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }
        const url = 'https://cryptic-bastion-47088.herokuapp.com/api/token/';
        const data = {
            username: username,
            password: password,
        };
        await axios.post(url, data).then((response) => {
            window.sessionStorage.setItem('userToken', response.data.token);
            window.sessionStorage.setItem('username', username);
            router.push("/");
        }).catch((error) => {
            if (error.response.status === 403) {
                alert("Invalid username or password");
            }
        });
    };



    return (
        <div className={styles.container}>
            <h1 style={{ fontWeight: 'bold', marginTop: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Please login to acess all the features.
            </h1>
            <div className={styles.formPaper}>
                <h2 style={{ fontWeight: 'bold' }}>Login</h2>
                <Form className={styles.formContainer}>
                    <Form.Group className={`mb-3 ${styles.formGroup}`} controlId="formBasicEmail">
                        <Form.Label>
                            Username
                        </Form.Label>
                        <InputGroup >
                            <InputGroup.Text className={styles.iconContainer} id="basic-addon1">
                                <svg style={{ color: 'rgba(255, 255, 255, 0.6)' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </InputGroup.Text>
                            <Form.Control onChange={handleUsernameChange}
                                className={styles.inputStyle} type="text" placeholder="Enter username" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className={`mb-3 ${styles.formGroup}`} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className={styles.iconContainer} id="basic-addon1">
                                <svg style={{ color: 'rgba(255, 255, 255, 0.6)' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                </svg>
                            </InputGroup.Text>
                            <Form.Control onChange={handlePasswordChange}
                                className={styles.inputStyle} type="password" placeholder="Password" />
                        </InputGroup>
                    </Form.Group>
                    <Button onClick={handleSubmit} style={{ marginTop: '1rem' }} variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
            <h3 className={styles.accountText}>{"Don't"} have an account yet?{' '}
                <Link href='/register'><a className={styles.registerText}>register</a></Link>
            </h3>
        </div >
    );
}