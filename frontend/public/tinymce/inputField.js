tinymce.PluginManager.add("inputField", (editor, url) => {
   const openDialog = () => editor.windowManager.openUrl({
    title: "Add an Input Field",
    url: '/input-dialog',
    width: 550,
    height: 300,
    onMessage : (dialogApi, details)=>{
      if(details.mceAction==="addInputField")
      editor.insertContent(details.data.content)
      dialogApi.close();
    }
  });

  /* Add a button that opens a window */
  editor.ui.registry.addButton("inputField", {
    text: "Input Field",
    onAction: () => {
      openDialog();
    },
  });

  editor.ui.registry.addMenuItem("inputField", {
    text: "Add Input",
    onAction: () => {
      openDialog();
    },
  });
});
