import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TinyEditor = (props: any) => {
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
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);
    return () => {
      s.disconnect();
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
    event.preventDefault();
  };

  const templateNameChangeHandler = (event: any) => {
    setTemplateName(event.target.value);
  };

  return (
    <div
      className="px-7 pt-2 flex items-center flex-col"
      onSubmit={handleSubmit}
    >
      <input
        onChange={templateNameChangeHandler}
        className="w-full h-20 my-4 text-3xl font-bold p-2 border-[rgba(0,0,0,0.1)] border-solid border-b-2 focus:outline-none"
        value={templateName}
        placeholder="Template Name"
      />
      <Editor
        ref={editorRef}
        apiKey="q1l0wbw69iya46bmue4pwj4o4si6utmsxxt5eqc8ppifonkn"
        disabled={isLoading}
        value={
          isLoading
            ? "<h3 class=loadingText >Fetching the template</h3>"
            : content
        }
        init={{
          height: 1263,
          width: 892.5,
          menubar: true,
          content_css: "/tinymce/EditorStyles.css",
          setup: (editor) => {
            editor.on("ExecCommand", function (e) {
              if (e.command === "mceInsertTable") {
                const curr = editor.getContent();
                editor.setContent(`${curr}<p></p>`);
              }
            });
          },
          plugins: " export image editimage lists checklist preview table",
          external_plugins: {
            inputField: "/tinymce/inputField.js",
          },
          table_style_by_css: true,

          table_toolbar:
            "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
          toolbar:
            "inputField undo redo export image editimage bullist numlist checklist preview | styles fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | lineheight indent outdent",
        }}
        onEditorChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        <Link to={`/template/preview/${documentId}`}>Preview Template</Link>
      </button>
      <br />
    </div>
  );
};

export default TinyEditor;
