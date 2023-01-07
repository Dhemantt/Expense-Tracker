import React, { useRef, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../feature/uiSlice';
import style from './Login.module.css';

function Login() {

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const confirmPasswordInputRef = useRef()
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    console.log(isLoading)
    const [responseError, setResponseError] = useState(false);
    const { isloggedIn } = useSelector(state => state.user)

    const dispatch = useDispatch();

    // const navigate = useNavigate()

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const passwordChangeHandler = (e) => {
        const item = e.target.value

    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const API_KEY = 'AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM'
        const Email = emailInputRef.current.value;
        const Password = passwordInputRef.current.value;


        const OPTION = isLogin ? "signInWithPassword" : "signUp";
        try {
            setisLoading(true);
            if (isLogin) {
                const res = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:${OPTION}?key=${API_KEY}`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: Email,
                            password: Password,
                            returnSecureToken: true,
                        }),
                    }
                );
                const data = await res.json();
                // setisLoading(false)
                  
                if (res.ok) {
                    setisLoading(false)
                    console.log(isLoading)
                    console.log('res works', data.idToken, data)
                    dispatch(auth.login({
                        idToken: data.idToken,
                        email: data.email
                    }))
                    // console.log(data,isloggedIn);
                }

                else if (data.error) {
                    console.log(data.error)
                    setResponseError(true);
                }
                 
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className={style.formContainer}>
                <form onSubmit={submitHandler} className={style.formContainer}>
                    {isLogin ? <h1>Login</h1> : <h1>REGISTER</h1> }
                    <div>
                        <input type="email" placeholder="Email"
                            className={style.formControl}
                            ref={emailInputRef} required />
                    </div>
                    <div>
                        <input type="password" placeholder="Password"
                            className={style.formControl}
                            onChange={passwordChangeHandler}
                            ref={passwordInputRef} required />
                    </div>
                    {!isLogin && <div>
                        <input type="password" placeholder="Confirm Password"
                            className={style.formControl}
                            ref={confirmPasswordInputRef} required />
                    </div>}
                    <div className={style.formControl}>
                        <button
                            type="submit"
                            id="btnLogin"
                            disabled={isLoading ? true : false}
                            className={style.btnLogin}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                            {isLoading && (
                                <>
                                    <div className={style.ldsRing}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            className={style.btnRegister}
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin ? " Create a new account" : "Have an account! Login Now"}
                        </button>
                        {responseError && (
                            <p className={style.forErrorMsgs}>{responseError}</p>
                        )}
                    </div>
                </form>
            </section>
        </>


    )
}

export default Login