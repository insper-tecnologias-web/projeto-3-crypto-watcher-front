import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/RegisterPage.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    return (
        <div className={styles.container}>
            <div className={styles.formPaper}>
                <h2 style={{ fontWeight: 'bold' }}>Register</h2>
                <Form className={styles.formContainer}>

                    <Form.Group className={`mb-3 ${styles.formGroup}`} controlId="formBasicUserName">
                        <Form.Label>
                            Username
                        </Form.Label>
                        <InputGroup >
                            <InputGroup.Text className={styles.iconContainer} id="basic-addon1">
                                <svg style={{ color: 'rgba(255, 255, 255, 0.6)' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </InputGroup.Text>
                            <Form.Control onChange={handleEmailChange}
                                className={styles.inputStyle} type="user" placeholder="Enter your username" />
                        </InputGroup>
                    </Form.Group>

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
                    <Button style={{ marginTop: '1rem' }} variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </div >
    );
}