import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const TinyEditor = () => {
  const [content, _setContent] = useState("");
  const contentRef = useRef(content);
  const editorRef = useRef(null);
  const setContent = (cont: string) => {
    _setContent(cont);
    contentRef.current = cont;
  };
  const [socket, setSocket] = useState<any>(null);
  const { id: documentId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.once("load-document", (document: string) => {
      console.log(isLoading);
      setIsLoading(false);
      setContent(document);
    });

    socket.emit("get-document", documentId);
  }, [socket, documentId]);

  useEffect(() => {
    if (socket == null) return;
    if (isLoading) return;

    const interval = setInterval(() => {
      socket.emit("save-document", contentRef.current!);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, isLoading]);

  const handleChange = (content: string, editor: any) => {
    setContent(content);
  };

  const handleSubmit = (event: any) => {
    let editorIframe = document.querySelector("iframe");
    const bekarFooter: HTMLDivElement =
      document.querySelector(".tox-statusbar")!;
    bekarFooter.style.display = "none";
    if (editorIframe) {
      const editorDom = editorIframe.contentDocument;
      if (editorDom) {
        // const cloneEditorDom = editorDom.cloneNode(true);
        const inputs = editorDom.getElementsByTagName("input");
        // console.log(cloneEditorDom)
        // console.log(editorDom)
        for (let input of inputs) {
          input.placeholder = input.value;
        }
        console.log(editorDom.body.innerHTML);
        // console.log(oldHtml)
      }
    }

    event.preventDefault();
  };

  return (
    <div
      className="px-7 pt-2 flex items-center flex-col"
      onSubmit={handleSubmit}
    >
      <Editor
        ref={editorRef}
        apiKey="q1l0wbw69iya46bmue4pwj4o4si6utmsxxt5eqc8ppifonkn"
        value={isLoading ? "<h1>Ruk JA BSDK</h1>" : content}
        init={{
          height: 1263,
          width: 892.5,
          menubar: true,
          content_css: "/tinymce/EditorStyles.css",
          plugins: "export image editimage lists checklist preview table",
          external_plugins: {
            inputField: "/tinymce/inputField.js",
          },
          custom_ui_selector: ".my-custom-button",
          table_style_by_css: true,
          table_toolbar:
            "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
          toolbar:
            "inputField  undo redo export image editimage bullist numlist checklist preview | styles fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | lineheight indent outdent",
        }}
        onEditorChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Preview Template
      </button>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <br />
    </div>
  );
};

export default TinyEditor;
