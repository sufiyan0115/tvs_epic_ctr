import styles from "./PreviewTemplatePage.module.css"
import { useParams } from "react-router-dom";
import { useState } from "react";

const PreviewTemplatePage = (props : any) => {
 
 const [content, setContent] = useState(" ");
 const {id: documentId} = useParams();
 console.log(documentId)

  return (
    <div style={{ border: "solid black 2px" }}>
      <div
        className={styles["mce-content-body"]}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default PreviewTemplatePage;