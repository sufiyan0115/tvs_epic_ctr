import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";
const parser = new DOMParser();


const TinyEditor = () => {
  const [state, setState] = useState({
    content: ``,
    display: ``
  });
 



  const handleChange = (content: string, editor: any) => {
    setState({ content,
      display: content
    });
  };

  const handleSubmit = (event: any) => {
       
  let editorIframe = document.querySelector("iframe");
  const bekarFooter: HTMLDivElement = document.querySelector(".tox-statusbar")!;
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
        input.value = input.value;
      }
      const oldHtml = editorDom.body.innerHTML;
      // console.log(editorDom.body.innerHTML)
      // console.log(oldHtml)
    }
  }

    event.preventDefault();
  };

  return (
    <div className="px-7 pt-2 flex items-center flex-col" onSubmit={handleSubmit}>
      <Editor
        apiKey="q1l0wbw69iya46bmue4pwj4o4si6utmsxxt5eqc8ppifonkn"
        value={state.content}
        init={{
          height: 1263,
          width: 892.5,
          menubar: true,
          content_css: "/tinymce/EditorStyles.css",
          external_plugins: {
            inputField: "/tinymce/inputField.js",
          },
          custom_ui_selector: ".my-custom-button",
          toolbar: "inputField table",
        }}
        onEditorChange={handleChange}
      />
      <div dangerouslySetInnerHTML={{ __html: state.display }}></div>
      <button type="submit" onClick={handleSubmit}>Click Me</button>
      <br />
    </div>
  );
};

export default TinyEditor;
