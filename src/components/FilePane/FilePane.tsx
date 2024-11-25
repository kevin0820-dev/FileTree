import { useState } from "react";
import { FolderData } from "../../types";
import useTraverseTree from "../../hooks/use-traverse-tree";
import Folder from "../Folder/Folder";

const FilePane = ({data, setData, left, handleCopyButton}: {data: FolderData | null, setData: (data: FolderData | null) => void, left: boolean, handleCopyButton: (isFolder: boolean, name: string) => void}) => {
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

  return (
        <div className="p-1.25 bg-white flex flex-col">
          <Folder
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleUpdateFolder={handleUpdateFolder}
            data={data}
            left={left}
            handleCopyButton={handleCopyButton}
          />
        </div>
    );
}

export default FilePane;