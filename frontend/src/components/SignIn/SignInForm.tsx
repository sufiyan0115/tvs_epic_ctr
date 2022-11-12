import useInput from "../../hooks/useInput";
import { useAuth } from "../../hooks/useAuth";
import "./SignInForm.css";
import { Link } from "react-router-dom";

const isGoodPassword = (value: any) => {
  return value.trim().length >= 8;
};
const isEmail = (value: string) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return value.match(validRegex);
}

const BasicForm = (props: any) => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isGoodPassword);
  const { login } = useAuth();

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async(event: any) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const values = {
      password: passwordValue,
      email: emailValue,
    };
    await login(values);

    resetEmail();
    resetPassword();
  };

  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form
      className={` flex flex-col justify-center ${props.className}`}
      onSubmit={submitHandler}
    >
      <div className="w-1/2 mb-12 flex justify-start">
        <img src="/img/signin/logo.png" alt="" />
      </div>

      <div className="text-4xl font-bold mb-8 ">
        <span>Login</span>
      </div>

      <div className={`${emailClasses} `}>
        <label className="font-bold text-base " htmlFor="name">
          E-Mail Address
        </label>
        <input
          type="text"
          id="name"
          className="w-full"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text text-xs">
            Please enter a valid email address.
          </p>
        )}
      </div>
      <div className={`${passwordClasses} `}>
        <label className="font-bold text-base" htmlFor="name">
          Password
        </label>
        <input
          className="w-full"
          type="password"
          id="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className="error-text text-xs">
            Password must contain atleast 8 characters.
          </p>
        )}
      </div>
      <div className="form-actions flex mt-5 w-full">
        <button
          className="btn btn-sm  bg-accent  text-white hover:bg-accentHover btn-outline w-full hidden lg:flex"
          disabled={!formIsValid}
        >
          Submit
        </button>
      </div>
       <div className="flex justify-center text-sm mt-8 ">
        <span>Don't have an account? <Link className="text-blue-500" to={"/signup"}>Signup</Link></span>
       </div>
    </form>
  );
};

export default BasicForm;

{
  /* 
      <div className='control-group'>
<div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p className="error-text">Please enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p className="error-text">Please enter a last name.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
      </div>

    */
}
