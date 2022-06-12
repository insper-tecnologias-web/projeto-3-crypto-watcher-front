import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useState } from 'react';
import styles from '../../styles/RegisterPage.module.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Email: ${email}`);
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        if (validateEmail(email) === false) {
            alert('Please enter a valid email');
            return;
        }
        if (!username || !password || !email) {
            alert('Please fill in all fields');
            return;
        }
        const url = 'https://cryptic-bastion-47088.herokuapp.com/api/register/';
        const data = {
            username: username,
            email: email,
            password: password,
        };
        console.log(data);
        await axios.post(url, data).then((response) => {
            window.sessionStorage.setItem('userToken', response.data.token);
            router.push("/");
        }).catch((error) => {
            if (error.response.status === 403) {
                alert("Invalid username or password");
            }
        });
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
                            <Form.Control onChange={handleUsernameChange}
                                className={styles.inputStyLoginle} type="user" placeholder="Enter your username" />
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
                    <Button onClick={handleSubmit}  style={{ marginTop: '1rem' }} variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </div >
    );
}