import { useState } from "react";
import "./App.css";
import folderData from "./data/folderData";
import customData from "./data/myData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(folderData);
  const [myData, setMyData] = useState(customData);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();
  
  const handleInsertNode = (folderId, itemName, isFolder) => {
    const finalItem = insertNode(explorerData, folderId, itemName, isFolder);
    return finalItem;
  };
  const handleDeleteNode = (folderId) => {
    const finalItem = deleteNode(explorerData, folderId);
    setExplorerData(finalItem);
  };

  const handleUpdateFolder = (id, updatedValue, isFolder) => {
    const finalItem = updateNode(explorerData, id, updatedValue, isFolder);
    setExplorerData(finalItem);
  };

  const handleInsertNodeT = (folderId, itemName, isFolder) => {
    const finalItem = insertNode(myData, folderId, itemName, isFolder);
    return finalItem;
  };
  const handleDeleteNodeT = (folderId) => {
    const finalItem = deleteNode(myData, folderId);
    setMyData(finalItem);
  };

  const handleUpdateFolderT = (id, updatedValue, isFolder) => {
    const finalItem = updateNode(myData, id, updatedValue, isFolder);
    setMyData(finalItem);
  };

  const handleCopyButton = (event, isFolder, name) => {
    console.log("copy");
    const finalItem = insertNode(myData, myData.id, name, isFolder);
    setMyData(finalItem);
    handleUpdateFolder();
  }
  return (
    <div className="App">
      <div className="folderContainerBody">
        <div className="folder-container">
          <Folder
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleUpdateFolder={handleUpdateFolder}
            explorerData={explorerData}
            left = {true}
            handleCopyButton = {handleCopyButton}
          />
        </div>
        <div className="folder-container">
          <Folder
            handleInsertNode={handleInsertNodeT}
            handleDeleteNode={handleDeleteNodeT}
            handleUpdateFolder={handleUpdateFolderT}
            explorerData={myData}
            left = {false}
            handleCopyButton = {handleCopyButton}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
