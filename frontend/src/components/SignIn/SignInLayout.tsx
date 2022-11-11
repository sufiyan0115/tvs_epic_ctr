import SignInForm from "./SignInForm";

const SignInLayout = () => {
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className="w-2/5 flex ">
        <div className="w-1/3"></div>
        <SignInForm className="w-2/3"></SignInForm>
      </div>
      <div className="w-3/5 flex justify-start">
          <img
            className="scale-x-[-1]"
            src="/img/signin/SignInLady.png"
            alt=""
          />
      </div>
    </div>
  );
};

export default SignInLayout;
