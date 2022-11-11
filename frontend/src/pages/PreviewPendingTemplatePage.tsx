import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../config/constants";
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

const PreviewPendingTemplatePage = (props: any) => {
  const [content, setContent] = useState(" ");
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const [name, setName] = useState();
  const navigate = useNavigate();
  
  let errorOccured = false, message;
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
    } catch (err:any) {
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
        `${API_URL}approve`,
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
    if(!user.isAdmin) return;
    await approveTemplate();
    navigate(`/template/approved`);
  };

  let pageContent = (
  <div className="px-7 pt-2 flex items-center flex-col bg-[rgb(248,249,250)]  min-h-screen">
  <div className="flex items-center w-[892px] ">
    <span
      className="w-10/12  bg-[rgb(248,249,250)]  my-4 templateNameInput text-3xl font-bold p-2 border-[rgba(0,0,0,0.1)] border-solid border-b-2 focus:outline-none"
      placeholder="Template Name"
    >
      {name}
    </span>
    {user.isAdmin && <div className="flex items-end  w-2/12">
      <button
        onClick={approvalClickHandler}
        className="btn btn-sm text-accent border-[rgba(0,0,0,0.1)] transition-all hover:bg-accent hover:text-white  hidden lg:flex w-full"
      >
        Approve 
      </button>
    </div>}
  </div>
  <div className="bg-white mb-8 rounded shadow-lg">
    <div
      className={`mce-content-body  bg-white`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  </div>
</div>
);

if(errorOccured)
{
    pageContent = <ErrorPage message={message}></ErrorPage>
}

  return (pageContent);
};

export default PreviewPendingTemplatePage;
