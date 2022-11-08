import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PreviewTemplatePage.css";
import PreviewInput from "../components/PreviewInput";

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

const PreviewTemplatePage = (props: any) => {
  const [content, setContent] = useState(" ");
  const { id: documentId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/getData/${documentId}`)
      .then((res) => res.json())
      .then((data) => {
        let editorData = data.data;
        // editorData = editorData.replace("input", "PreviewInput");
        setContent(editorData);
      });
  }, []);

  useEffect(() => {
    draftToPreview();
  }, [content]);

  return (
    <div
      className="flex flex-col items-center"
      style={{ border: "solid black 2px" }}
    >
      <div
        className={`mce-content-body w-1/2 `}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <button>
        <Link to={`/template/draft/${documentId}`}> Go Back </Link>
      </button>
    </div>
  );
};

export default PreviewTemplatePage;
