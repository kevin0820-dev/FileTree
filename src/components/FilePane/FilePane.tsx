import { useState } from "react";
import { FolderData } from "../../types";
import useTraverseTree from "../../hooks/use-traverse-tree";
import Folder from "../Folder/Folder";

const FilePane = ({data, setData, left}: {data: FolderData | null, setData: (data: FolderData | null) => void, left: boolean}) => {
  const { insertNode, deleteNode, updateNode } = useTraverseTree();
  
  const handleInsertNode = (folderId: string, itemName: FolderData, isFolder: boolean) => {
    if(data){
      const finalItem = insertNode(data, folderId, itemName, isFolder);
      return finalItem;
    }
  };

  const handleDeleteNode = (folderId: string) => {
    if(data){
      const finalItem = deleteNode(data, folderId);
      setData(finalItem);
    }
  };

  const handleUpdateFolder = (id: string, updatedValue: string) => {
    if(data){
      const finalItem = updateNode(data, id, updatedValue);
      setData(finalItem);
    }
  };

  const handleCopyButton = (event: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, name: string) => {
    console.log("copy");
    const copiedItem = {
      id: new Date().getTime().toString(),
      name: name,
      isFolder: isFolder,
      group: isFolder ? "folder" : "file",
      shared: data?.shared ? data.shared : "by",
      items: [],
    }
    if(data){
      const finalItem = insertNode(data, data.id, copiedItem, isFolder);
    }
    if(data?.id) handleUpdateFolder(data.id, data.name);
  };

  return (
        <div className="p-1.25 bg-white flex flex-col">
          <Folder
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleUpdateFolder={handleUpdateFolder}
            data={data}
            left={left}
            handleCopyButton={handleCopyButton}
            root="with"
          />
        </div>
    );
}

export default FilePane;