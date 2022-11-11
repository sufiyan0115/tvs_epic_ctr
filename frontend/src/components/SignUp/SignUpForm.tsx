import useInput from "../../hooks/useInput";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const isGoodPassword = (value: any) => {
  return value.trim().length >= 8;
};
const isEmail = (value: string) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return value.match(validRegex);
}

const isValidName = (value: string)=>{
    return  value.trim() !== '';
}

const SignUpForm = (props: any) => {
    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
      } = useInput(isValidName);
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

  const { register } = useAuth();

  let formIsValid = false;

  if (emailIsValid && passwordIsValid && nameIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const values = {
      name: nameValue,
      password: passwordValue,
      email: emailValue,
    };
    register(values);
    resetName();
    resetEmail();
    resetPassword();
  };

  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const nameClasses = nameHasError ? "form-control invalid" : "form-control";
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
        <span>Sign Up</span>
      </div>

      <div className={`${nameClasses} `}>
        <label className="font-bold text-base " htmlFor="name">
            Full Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className="error-text text-xs">
           Name cannot be empty.
          </p>
        )}
      </div>

      <div className={`${emailClasses} `}>
        <label className="font-bold text-base " htmlFor="email">
          E-Mail Address
        </label>
        <input
          type="text"
          id="email"
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
        <span>Already have an account? <Link className="text-blue-500" to={"/signin"}>Login</Link></span>
       </div>
    </form>
  );
};

export default SignUpForm;

