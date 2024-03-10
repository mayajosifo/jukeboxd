import React, { useState } from 'react';
import styles from './SignUpPage.module.css';
import { useNavigate } from 'react-router-dom';
import { createUser, newUserDoc, validateUsername } from '../config/firebase'

function SignUpPage( { setIsSignedIn, setUserId }) 
{
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // Check if username alreadu taken
        validateUsername(newUsername)
            .then(valid => {
                if (valid) {
                    createUser(newEmail, newPassword)
                        .then((userCredential) => {
                            // Signed up 
                            const user = userCredential.user;
                            // Create new Document in users Collection in Firestore
                            newUserDoc(user.uid, newUsername, newEmail)
                                .then(() => {
                                    console.log('New user created')
                                    setIsSignedIn(true);
                                    setUserId(user.uid);
                                    navigate('/user-page');
                                })
                                .catch((error) => {
                                    console.error('Error creating new user:', error)
                                    setErrorMessage('Failed to create new user.')
                                });
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            console.error('Error setting up auth token:', error)

                            if (errorCode === 'auth/email-already-in-use') {
                                setErrorMessage('Email is already associated with an account.')
                            }
                            else if (errorCode === 'auth/weak-password') {
                                setErrorMessage('Password must be at least 6 characters.')
                            }
                            else {
                                setErrorMessage('Whoops, something went wrong. Please try again.')
                            }
                        });
                    }
                else {
                    setErrorMessage('Username already taken.')
                }
            })
            .catch((error) => {
                console.error('Username validation error:', error)
            })
    }


    return (
        <div className={styles.form}>
            <div className={styles.container}>
                <h1>Welcome to Jukeboxd!</h1>
                    {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                    <form className={styles.sign_up_form} onSubmit={handleSignUp}>
                        <div className={styles.form_row}>
                            <label htmlFor="username">Username: </label>
                            <input type="text" name="username" id="username" value={newUsername} 
                            required
                            onChange={e => {setNewUsername(e.target.value); e.target.setCustomValidity('')}}
                            onInvalid={(e) => e.target.setCustomValidity("Please enter a username")}
                            onBlur={(e) => e.target.setCustomValidity('')}/>
                        
                        </div>
                        <div className={styles.form_row}>
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" value={newEmail}
                            required
                            onChange={e => {setNewEmail(e.target.value); e.target.setCustomValidity('')}}
                            onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address")}
                            onBlur={(e) => e.target.setCustomValidity('')}/>
                        </div>
                        <div className={styles.form_row}>
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" id="password" value={newPassword}
                            required
                            onChange={e => {setNewPassword(e.target.value); e.target.setCustomValidity('')}}
                            onInvalid={(e) => e.target.setCustomValidity("Please enter a password")}
                            onBlur={(e) => e.target.setCustomValidity('')}
                            />
                        </div>
                        <div className={styles.signup_button}>
                            <input type="submit" value="Create User" />
                        </div>

                    </form>
            </div>
        </div>
    )
}

export default SignUpPage;