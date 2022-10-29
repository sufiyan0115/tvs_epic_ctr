import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {io} from "socket.io-client";

const App = () => {
  const [state, setState] = useState({
    content: "",
  });


  useEffect(()=>{
    const s = io("http://localhost:3000");

    return ()=>{
      s.disconnect()
    }

  },[])

  const findInputs  = (content: string)=> {
    let display =  content;
    display = display.replace("[]",`<input> `)
    return display;
  }

  const handleChange = (content: string, editor: any) => {
    const display = findInputs(content);
    setState({ content:display });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="text-xl text-white px-3 py-1 bg-primary">TVS E.P.I.C</h1>
      <form className="px-7 pt-2" onSubmit={handleSubmit}>
        <Editor
          apiKey="q1l0wbw69iya46bmue4pwj4o4si6utmsxxt5eqc8ppifonkn"
          value={state.content}
          init={{
            height: 300,
            menubar: true,
            content_css: "EditorStyles.css"
          }}
          onEditorChange={handleChange}
        />
        <br />
      </form>
      <div dangerouslySetInnerHTML={{__html: state.content}} >
      </div>
    </>
  );
};

export default App;
