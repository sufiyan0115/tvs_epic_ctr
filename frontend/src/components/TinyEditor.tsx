import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const TinyEditor = (props: any) => {
  const [content, _setContent] = useState(" ");
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
  const [isDraft, setIsDraft] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket == null || user == null) return;

    socket.once("load-document", (document: any) => {
      console.log(isLoading);
      console.log(document);
      setIsLoading(false);
      console.log(document)
      if(document.status==="Draft")
      setIsDraft(true);
      setContent(document.data);
      setTemplateName(document.name);
    });

    socket.emit("get-document", { id: documentId, user });
  }, [socket, documentId, user]);

  useEffect(() => {
    if (socket == null) return;
    if (isLoading) return;

    const interval = setInterval(() => {
      socket.emit("save-document", {
        name: templateName,
        data: contentRef.current!,
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, isLoading, templateName]);

  const handleChange = (content: string, editor: any) => {
    setContent(content);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate(`/template/preview/${documentId}`)
  };

  const templateNameChangeHandler = (event: any) => {
    console.log(event.target.value);
    setTemplateName(event.target.value);
  };

  return (
    <div
      className="px-7 pt-2 flex items-center flex-col "
      onSubmit={handleSubmit}
    >
      <div className="flex w-[892px] ">
        <input
          onChange={templateNameChangeHandler}
          className="w-10/12  bg-[rgb(248,249,250)]  my-4 templateNameInput text-3xl font-bold p-2 border-[rgba(0,0,0,0.1)] border-solid border-b-2 focus:outline-none"
          value={templateName}
          placeholder="Template Name"
        />
        <div className="flex items-end mb-5 w-2/12">
          <button
            type="submit"
            className="flex btn btn-sm text-accent border-[rgba(0,0,0,0.1)] transition-all hover:bg-accent hover:text-white  lg:flex w-full"
            onClick={handleSubmit}
          >
            Preview
          </button>
        </div>
      </div>
      <Editor
        ref={editorRef}
        apiKey="q1l0wbw69iya46bmue4pwj4o4si6utmsxxt5eqc8ppifonkn"
        disabled={isLoading || !isDraft}
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
          plugins: "  image  lists  table fullscreen link" ,
          external_plugins: {
            inputField: "/tinymce/inputField.js",
          },
          table_style_by_css: true,
          toolbar_sticky: true,
          table_toolbar:
            "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
          toolbar: [
            "undo redo inputField | styles fontfamily fontsize   | link image | bullist numlist fullscreen",
            "bold italic underline forecolor | alignleft aligncenter alignright alignjustify | lineheight indent outdent",
          ],
        }}
        onEditorChange={handleChange}
      />

      <br />
    </div>
  );
};

export default TinyEditor;
