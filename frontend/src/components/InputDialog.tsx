import {  useState } from "react";

const InputDialog = () => {
    const [fieldName,setFieldName] = useState(" ");
    const [placeHolder, setPlaceHolder] = useState(" ");


  const fieldNameChangeHandler = (event: any)=>{
    setFieldName(event.target.value);
  }
  const placeHolderChangeHandler = (event: any)=>{
    setPlaceHolder(event.target.value);
  }

  const addHandler = () => {
    window.parent.postMessage(
      {
        mceAction: "addInputField",
        data: {
          content: `<input class="editorInput" disabled contentEditable placeholder="${placeHolder}" />`,
        },
      },
      "*"
    );
  };

  const closeHandler = () => {
    window.parent.postMessage(
      {
        mceAction: "close",
      },
      "*"
    );
  };

  return (
    <form className="flex flex-col text-md px-2 py-2  h-full">
      <div className="py-2 flex flex-col px-2">
        <label htmlFor="fieldName" className="text-sm text-neutral-500 pb-1">
          Field Name
        </label>
        <input
          type="text"
          value={fieldName}
          onChange={fieldNameChangeHandler}
          className="border-solid border-neutral-200 focus:border-[#5faaf1] h-8 rounded-md border-2 outline-none"
          name="fieldName"
        />
      </div>
      <div className="py-2 flex flex-col px-2 ">
        <label htmlFor="placeHolder" className="text-sm text-neutral-500 pb-1">
          PlaceHolder Text
        </label>
        <input
          type="text"
          onChange={placeHolderChangeHandler}
          value={placeHolder}
          className="border-solid border-neutral-200 focus:border-[#5faaf1] h-8 rounded-md border-2 outline-none"
          name="placeHolder"
        />
      </div>
      <div className="py-2 px-2 flex flex-row-reverse">
        <button
          className="bg-[#5faaf1] hover:bg-[#2088eb] text-white text-sm rounded-md ml-3 px-3 py-2"
          onClick={addHandler}
        >
          Add
        </button>
        <button
          className="bg-neutral-200 hover:bg-neutral-300 text-black text-sm rounded-md px-3 py-2"
          onClick={closeHandler}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default InputDialog;
