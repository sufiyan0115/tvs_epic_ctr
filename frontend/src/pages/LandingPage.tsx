import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1 className="text-xl text-white px-3 py-1 bg-primary">TVS E.P.I.C</h1>
      <button className="bg-primary text-white">
        <Link to="/template/draft">Create a new Template</Link>
      </button>
    </div>
  );
}

export default LandingPage;
