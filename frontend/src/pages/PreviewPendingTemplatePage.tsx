import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../config/constants";
import Navbar from "../components/Navbar";
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
        cell.classList.remove("previewCellEmpty");
        cell.classList.add("previewCell");
      }
    });
  }
};

const PreviewPendingTemplatePage = (props: any) => {
  const [content, setContent] = useState(" ");
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const [name, setName] = useState();
  const [textarea, setTextarea] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  let errorOccured = false,
    message;
  const fetchPreview = async () => {
    try {
      const response = await axios.get(
        `${API_URL}template/pending/${documentId}`,
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
      errorOccured = true;
      message = err?.response?.data?.message.message || "Something went wrong";
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  useEffect(() => {
    draftToPreview();
  }, [content]);

  const approveTemplate = async () => {
    try {
      const response = await axios.post(
        `${API_URL}template/approve`,
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

  const rejectTemplate = async () => {
    try {
      const response = await axios.post(
        `${API_URL}template/reject`,
        {
          id: documentId,
          feedback
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

  const rejectionReqHandler = async () => {
    await rejectTemplate();
    navigate(`/template/rejected`);
  };

  const feedbackCloseHandler = async () => {
    setTextarea(false);
  };

  const rejectionClickHanlder = async () => {
    if (!user.isAdmin) return;
    console.log("here dfad");
    setTextarea(true);
  };

  const feedbackChangeHandler =(e:any)=>{
    setFeedback(e.target.value);
  }

  const approvalClickHandler = async () => {
    if (!user.isAdmin) return;
    await approveTemplate();
    navigate(`/template/approved`);
  };

  const nameClass =
    " bg-[rgb(248,249,250)]  my-4 templateNameInput text-3xl font-bold p-2 border-[rgba(0,0,0,0.1)] border-solid border-b-2 focus:outline-none";

  console.log(textarea);

  let pageContent = (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="px-7 pt-2 flex items-center flex-col bg-[rgb(248,249,250)]  min-h-screen">
        <div className="flex items-center w-[892px] ">
          <span
            className={`${nameClass} ${user.isAdmin ? "w-9/12" : "w-full"}`}
            placeholder="Template Name"
          >
            {name}
          </span>
          {user.isAdmin && (
            <div className="flex items-end  w-3/12">
              <button
                onClick={approvalClickHandler}
                className="btn ml-2 btn-sm text-accent border-[rgba(0,0,0,0.1)] hover:border-0 hover:border-green-300 transition-all hover:bg-[#2dc653] hover:text-white  hidden lg:flex w-1/2"
              >
                Approve
              </button>
              <button
                onClick={rejectionClickHanlder}
                className="btn ml-2 btn-sm text-accent border-[rgba(0,0,0,0.1)] transition-all hover:border-red-300 hover:bg-[#c9184a] hover:text-white  hidden lg:flex w-1/2"
              >
                Reject
              </button>
            </div>
          )}
        </div>

        {textarea && (
          <div className="w-[892px] items-end flex-col flex border-2 border-black">
            <textarea
              onChange={feedbackChangeHandler}
              placeholder="Please provide feedback"
              className="px-5 py-3 mx-2 mt-2  w-[870px] text-xl min-h-[150px] border-2 border-[rgba(0,0,0,0.1)] bg-[rgb(248,249,250)] outline-none  "
            ></textarea>
            <div className="mx-2">
              <button onClick={feedbackCloseHandler} className="rounded-md my-4 mx-3 text-white bg-cyan-800 px-4 py-2 border-2 border-[rgba(0,0,0,0.1)]">
                Close
              </button>
              <button onClick={rejectionReqHandler} className="rounded-md my-4 text-white bg-red-500 px-4 py-2 border-2 border-[rgba(0,0,0,0.1)]">
                Reject
              </button>
            </div>
          </div>
        )}

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
    pageContent = <ErrorPage message={message}></ErrorPage>;
  }

  return pageContent;
};

export default PreviewPendingTemplatePage;
