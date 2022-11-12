import ReactLoading from "react-loading";

const LoadingPage = ()=>{
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <ReactLoading type="spinningBubbles" width={200} height={200} color="#FF7235"></ReactLoading>
            <p className="text-3xl mt-8 font-bold">Please wait</p>
        </div>
    )
}
export default LoadingPage;