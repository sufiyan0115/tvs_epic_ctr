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

const PreviewRejectedTemplatePage = (props: any) => {
  const [content, setContent] = useState(" ");
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const [name, setName] = useState();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [errorOccured, setErrorOccured] = useState(false);

  const fetchPreview = async () => {
    try {
      const response = await axios.get(
        `${API_URL}template/rejected/${documentId}`,
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
      const msg =
        err?.response?.data?.message.message || "Something went wrong";
      setErrorOccured(true);
      setErrorMessage(msg);
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  console.log("omw to render");

  useEffect(() => {
    draftToPreview();
  }, [content]);

  const sendToDraftClickHandler = async () => {
    await sendToDraft();
    navigate(`/template/draft/${documentId}`);
  };

  const sendToDraft = async () => {
    try {
      const response = await axios.post(
        `${API_URL}template/redraft/${documentId}`,
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



  let pageContent = (
    <div className="bg-[rgb(248,249,250)]">
      <div>
        <Navbar className="shadow-lg"></Navbar>
      </div>
      <div className="px-7 pt-2 flex items-center flex-col bg-[rgb(248,249,250)]  min-h-screen">
        <div className="flex items-center w-[892px] ">
          <span
            className="w-9/12  bg-[rgb(248,249,250)]  my-4 templateNameInput text-3xl font-bold p-2 border-[rgba(0,0,0,0.1)] border-solid border-b-2 focus:outline-none"
            placeholder="Template Name"
          >
            {name}
          </span>
          <div className="flex items-end  w-3/12">
            <button
              onClick={sendToDraftClickHandler}
              className="btn btn-sm text-accent border-[rgba(0,0,0,0.1)] transition-all hover:bg-accent hover:text-white  hidden lg:flex w-full"
            >
              Send to Drafts
            </button>
          </div>
        </div>
        <div className="bg-white mb-8 rounded shadow-lg">
          <div
            className={`mce-content-body  bg-white`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
       
      </div>
    </div>
  );

  if (errorOccured) {
    pageContent = <ErrorPage message={errorMessage}></ErrorPage>;
  }

  return pageContent;
};

export default PreviewRejectedTemplatePage;
