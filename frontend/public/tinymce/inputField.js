tinymce.PluginManager.add("inputField", (editor, url) => {
  //  const openDialog = () => editor.windowManager.openUrl({
  //   title: "Add an Input Field",
  //   url: '/input-dialog',
  //   width: 550,
  //   height: 300,
  //   onMessage : (dialogApi, details)=>{
  //     editor.insertContent(details.data.content)
  //     dialogApi.close();
  //   }
  // });

  const openDialog = () => {
    editor.insertContent(`<input>`);
  };

  /* Add a button that opens a window */
  editor.ui.registry.addButton("inputField", {
    text: "Input Field",
    onAction: () => {
      /* Open window */
      openDialog();
    },
  });

  /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
  editor.ui.registry.addMenuItem("inputField", {
    text: "Add Input",
    onAction: () => {
      /* Open window */
      openDialog();
    },
  });
  /* Return the metadata for the help plugin */
});
