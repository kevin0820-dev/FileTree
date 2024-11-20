import React, { useState } from "react";
import FolderItem from "./Items/FolderItem";
import FileItem from "./Items/FileItem";

import { FolderData } from '../../types';
interface FolderProps {
  handleInsertNode: (folderId: string, itemName: FolderData, isFolder: boolean) => FolderData|undefined;
  handleDeleteNode: (folderId: string) => void;
  handleUpdateFolder: (id: string, updatedValue: string, isFolder: boolean) => void;
  data: FolderData|null;
  left: boolean;
  root: string;
  handleCopyButton: (event: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, name: string) => void;
}

const Folder: React.FC<FolderProps> = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder,
  data,
  left,
  handleCopyButton,
  root,
}) => {
  const [nodeName, setNodeName] = useState<string>(data?.name || "");
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<{ visible: boolean; isFolder: boolean | null }>({
    visible: false,
    isFolder: null,
  });
  const [updateInput, setUpdateInput] = useState<{ visible: boolean; isFolder: boolean | null }>({
    visible: false,
    isFolder: null,
  });

  const handleNewFolderButton = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleUpdateFolderButton = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, nodeValue: string) => {
    setNodeName(nodeValue);
    e.stopPropagation();
    setUpdateInput({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(data?.id) handleDeleteNode(data.id);
  };

  const onAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && e.currentTarget.value) {
      const newFolder = {
        id: new Date().getTime().toString(),
        name: e.currentTarget.value,
        isFolder: showInput.isFolder as boolean,
        group: showInput.isFolder ? "folder" : "file",
        shared: root,
        items: [],
      };
      if(data?.id) handleInsertNode(data.id, newFolder, showInput.isFolder as boolean);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && e.currentTarget.value) {
      if(data?.id) handleUpdateFolder(data.id, e.currentTarget.value, true);
      setUpdateInput({ ...updateInput, visible: false });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.target.value);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    const target = JSON.parse(e.currentTarget.getAttribute('data-data') || '{}');

    if(target.id == '1'){
      return;
    }
    if (target.isFolder) {
      const copiedId = handleInsertNode(target.id, draggedItem, draggedItem.isFolder);
    }
    if(data?.id) handleUpdateFolder(data.id, data.name, true);
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleWrapperDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    handleInsertNode('1', draggedItem, draggedItem.isFolder);  
    if(data?.id) handleUpdateFolder(data.id, data.name, true);
  }

  if (data && data.isFolder) {
    return (
      <FolderItem
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateFolder={handleUpdateFolder}
        data={data}
        left={left}
        root={root}
        handleCopyButton={handleCopyButton}
        expand={expand}
        setExpand={setExpand}
        handleWrapperDrop={handleWrapperDrop}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        updateInput={updateInput}
        setUpdateInput={setUpdateInput}
        nodeName={nodeName}
        handleChange={handleChange}
        onUpdate={onUpdate}
        handleDeleteFolder={handleDeleteFolder}
        handleUpdateFolderButton={handleUpdateFolderButton}
        handleNewFolderButton={handleNewFolderButton}
        showInput={showInput}
        setShowInput={setShowInput}
        onAdd={onAdd}
      />
    );
  } else {
    return (      
      <FileItem
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateFolder={handleUpdateFolder}
        data={data}
        left={left}
        root={root}
        handleCopyButton={handleCopyButton}
        expand={expand}
        setExpand={setExpand}
        handleWrapperDrop={handleWrapperDrop}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        updateInput={updateInput}
        setUpdateInput={setUpdateInput}
        nodeName={nodeName}
        handleChange={handleChange}
        onUpdate={onUpdate}
        handleDeleteFolder={handleDeleteFolder}
        handleUpdateFolderButton={handleUpdateFolderButton}
        handleNewFolderButton={handleNewFolderButton}
        showInput={showInput}
        setShowInput={setShowInput}
        onAdd={onAdd}
      />
    );
  }
};

export default Folder;