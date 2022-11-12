import TinyEditor from "../components/TinyEditor";
import Navbar from "../components/Navbar";

const DraftTemplatePage = (props: any) => {
  return (
    <div className="bg-[rgb(248,249,250)]">
      <Navbar></Navbar>
      <TinyEditor ></TinyEditor>
    </div>
  );
};

export default DraftTemplatePage;
