import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../config/constants";
import Navbar from "../components/Navbar";
import ErrorPage from "./ErrorPage";
import "./PreviewTemplatePage.css";

const draftToPreview = () => {
  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.disabled = false;
    input.addEventListener("input", () => {
      if (input.value.trim() === "") {
        input.style.width = "166.4px";
        input.classList.remove("previewInput");
      } else {
        input.style.width = `${input.value.length}ch`;
        input.classList.add("previewInput");
      }
    });
  }
  const tableCells = document.querySelectorAll("td");
  for (let cell of tableCells) {
    if (cell.innerText.trim() === "") {
      cell.classList.add("previewCellEmpty");
      cell.contentEditable = "true";
    }
    cell.addEventListener("keypress", (event: any) => {
      if (event.target.innerText.trim() === "") {
        cell.classList.remove("previewCell");
        cell.classList.add("previewCellEmpty");
      } else {
        console.log("kuch to hai");
        cell.classList.remove("previewCellEmpty");
        cell.classList.add("previewCell");
      }
    });
  }
};

const PreviewDraftTemplatePage = (props: any) => {
  const [content, setContent] = useState(" ");
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const [name, setName] = useState();
  const navigate = useNavigate();
  const [errorOccured, setErrorOccured] = useState(false);
  const [error, setError] = useState<any>();
  const {type} = props;
  const fetchPreview = async () => {
    try {
      const response = await axios.get(
        `${API_URL}template/${type}/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = response.data;
      setContent(data.data);
      setName(data.name);
    } catch (err: any) {
      const msg = {
        message: err?.response?.data?.message.message || "Something went wrong",
        code: err?.response?.data?.code,
      };
      setErrorOccured(true);
      setError(msg);
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  console.log("omw to render");

  useEffect(() => {
    draftToPreview();
  }, [content]);

  const topButtonClickHandler = async () => {
    if(type==="draft")
    navigate(`/template/draft/${documentId}`);
    if(type==="rejected")
    {
     await sendToDraft();
    navigate(`/template/draft/${documentId}`);
    }

  };

 let topButtonText = "Edit";
 if(type==="rejected")
 topButtonText= "Send to Drafts";


const sendToDraft = async () => {
  try {
    const response = await axios.post(
      `${API_URL}template/redraft`,
      {
        id: documentId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  } catch (err) {
    console.warn(err);
  }
};
const sendForApproval = async () => {
    try {
      const response = await axios.post(
        `${API_URL}template/submit`,
        {
          id: documentId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

const approvalClickHandler = async () => {
    await sendForApproval();
    navigate(`/template/pending`);
  };


  if (errorOccured) {
    return <ErrorPage error={error}></ErrorPage>;
  }

  return (
    <div className="bg-[rgb(248,249,250)]">
      <div>
        <Navbar className="shadow-lg"></Navbar>
      </div>
      <div className="px-7 pt-2 flex items-center flex-col bg-[rgb(248,249,250)]  min-h-screen">
        <div className="flex items-center w-[892px] ">
          <span
            className="w-10/12  bg-[rgb(248,249,250)]  my-4 templateNameInput text-3xl font-bold p-2 border-[rgba(0,0,0,0.1)] border-solid border-b-2 focus:outline-none"
            placeholder="Template Name"
          >
            {name}
          </span>
          <div className="flex items-end  w-2/12">
            <button
              onClick={topButtonClickHandler}
              className="btn btn-sm text-accent border-[rgba(0,0,0,0.1)] transition-all hover:bg-accent hover:text-white  hidden lg:flex w-full"
            >
              {topButtonText}
            </button>
          </div>
        </div>
        <div className="bg-white mb-8 rounded shadow-lg">
          <div
            className={`mce-content-body  bg-white`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
        {type==="draft" && <button
          onClick={approvalClickHandler}
          className="btn btn-sm mb-8 text-white border-[rgba(0,0,0,0.1)] transition-all bg-accent hover:bg-accentHover hover:text-white  hidden lg:flex"
        >
          Send for Approval
        </button>}
      </div>
    </div>
  );


};

export default PreviewDraftTemplatePage;
