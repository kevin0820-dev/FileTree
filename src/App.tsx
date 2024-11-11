import { useState } from "react";
import "./App.css";
import folderData from "./data/folderData";
import customData from "./data/myData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import { FolderData } from './types'; // Import your types

function App() {
  const [explorerData, setExplorerData] = useState<FolderData | null>(folderData);
  const [myData, setMyData] = useState<FolderData | null>(customData);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();
  
  const handleInsertNode = (folderId: string, itemName: string, isFolder: boolean) => {
    if(explorerData){
      const finalItem = insertNode(explorerData, folderId, itemName, isFolder);
      return finalItem;
    }
  };

  const handleDeleteNode = (folderId: string) => {
    if(explorerData){
      const finalItem = deleteNode(explorerData, folderId);
      setExplorerData(finalItem);
    }
  };

  const handleUpdateFolder = (id: string, updatedValue: string) => {
    if(explorerData){
      const finalItem = updateNode(explorerData, id, updatedValue);
      setExplorerData(finalItem);
    }
  };

  const handleInsertNodeT = (folderId: string, itemName: string, isFolder: boolean) => {
    if(myData){
      const finalItem = insertNode(myData, folderId, itemName, isFolder);
      return finalItem;
    }
  };

  const handleDeleteNodeT = (folderId: string) => {
    if(myData){
      const finalItem = deleteNode(myData, folderId);
      setMyData(finalItem);
    }
  };

  const handleUpdateFolderT = (id: string, updatedValue: string) => {
    if(myData){
      const finalItem = updateNode(myData, id, updatedValue);
      setMyData(finalItem);
    }
  };

  const handleCopyButton = (event: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, name: string) => {
    console.log("copy");
    if(myData){
      const finalItem = insertNode(myData, myData.id, name, isFolder);
      if(finalItem) setMyData(finalItem);
    }
    // handleUpdateFolder();
  };

  return (
    <div className="App">
      <div className="folderContainerBody">
        <div className="folder-container">
          <Folder
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleUpdateFolder={handleUpdateFolder}
            data={explorerData}
            left={true}
            handleCopyButton={handleCopyButton}
          />
        </div>
        <div className="folder-container">
          <Folder
            handleInsertNode={handleInsertNodeT}
            handleDeleteNode={handleDeleteNodeT}
            handleUpdateFolder={handleUpdateFolderT}
            data={myData}
            left={false}
            handleCopyButton={handleCopyButton}
          />
        </div>
      </div>
    </div>
  );
}

export default App;