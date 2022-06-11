import styles from '../../styles/LoginPage.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const res = async () => {
        return await axios.post(
            "https://infinite-eyrie-41468.herokuapp.com/users/sign_in",
            {
                "user": {
                    "email": "test3@test.com",
                    "password": "senha123"
                }
            },
        ).then(response => response.headers.authorization)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        const url = 'https://infinite-eyrie-41468.herokuapp.com/users/sign_in';
        const data = {
            "user": {
                email: email,
                password: password,
            }
        };
        axios.post(url, { user: { email: email, password: password } }, {
            withCredentials: true,
            headers: { "Access-Control-Allow-*": "true" }
        })
            .then(response => {
                if (response.data.errors) {
                    setError(response.data.errors)
                }
                else {
                    setError("")
                    localStorage.setItem("token", response.data.jwt)
                }
            });

        res();


        // const res = await axios.post('https://infinite-eyrie-41468.herokuapp.com/users/sign_in',
        //     {
        //         "user": {
        //             "email": "test3@test.com",
        //             "password": "senha123"
        //         }
        //     }).then(response => console.log(response.headers));


        const response = await fetch("https://infinite-eyrie-41468.herokuapp.com/users/sign_in", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.headers);
        // const dados = await response.json();
        // console.log(dados);
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
                            Email address
                        </Form.Label>
                        <InputGroup >
                            <InputGroup.Text className={styles.iconContainer} id="basic-addon1">
                                <svg style={{ color: 'rgba(255, 255, 255, 0.6)' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </InputGroup.Text>
                            <Form.Control onChange={handleEmailChange}
                                className={styles.inputStyle} type="email" placeholder="Enter email" />
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
                        Submit
                    </Button>
                </Form>
            </div>
            <h3 className={styles.accountText}>Don't have an account yet?{' '}
                <Link href='/register'><a className={styles.registerText}>register</a></Link>
            </h3>
        </div >
    );
}