import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.css';
import { signIn } from '../config/firebase'


function SignInPage({ setIsSignedIn, setUserId }) 
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleSignUpClick = () => {
        navigate('/sign-up');
    };
    
    /*useEffect(() => {
        if (userId) {
            navigate(`/user-page/${userId}`); 
        }
    }, [userId, navigate]); */

    const handleSignIn = (e) => {
        e.preventDefault();

        signIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setIsSignedIn(true);
                setUserId(user.uid);
                navigate(`/user-page/${user.uid}`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //console.log({errorCode})
                //console.log({errorMessage})

                if (errorCode === 'auth/invalid-credential') {
                    setErrorMessage('User not found. Email/Password may be incorrect.')
                }
                else {
                    setErrorMessage('Whoops, something went wrong. Please try again.')
                }
            });



    };

   
   return(
    <div className={styles.form}>
        <div className={styles.container}>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className={styles.logo} />
        <h1>Guess Who's Back?</h1>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <form className={styles.sign_in_form} onSubmit={handleSignIn}>
                <div className={styles.form_row}>
                    <label htmlFor="email">
                        Email: 
                    <input type="email" name="email" id="email" value={email} required  
                    onChange={e => {setEmail(e.target.value); e.target.setCustomValidity('')}}
                    onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address")}
                    onBlur={(e) => e.target.setCustomValidity('')} />

                    </label>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="password">
                        Password:
                    <input type="password" name="password" id="password" value={password} required
                    onChange={e => {setPassword(e.target.value); e.target.setCustomValidity('')}}
                    onInvalid={(e) => e.target.setCustomValidity("Please enter a password")}
                    onBlur={(e) => e.target.setCustomValidity('')} />
                    </label>
                </div>
                <div className={styles.button_row}>
                    <input type="submit" value="Sign In" />
                    <button onClick={handleSignUpClick}>Sign Up</button>
                </div>

            </form>
         
        </div>
    </div>
   )
}


export default SignInPage;