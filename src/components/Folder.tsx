import React, { useState } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolder,
  VscFile,
  VscNewFolder,
  VscNewFile,
  VscEdit,
  VscTrash,
  VscArrowRight,
} from "react-icons/vsc";
import { FolderData } from '../types'; // Import your types

interface FolderProps {
  handleInsertNode: (folderId: string, itemName: FolderData, isFolder: boolean) => FolderData|undefined;
  handleDeleteNode: (folderId: string) => void;
  handleUpdateFolder: (id: string, updatedValue: string, isFolder: boolean) => void;
  data: FolderData|null; // Use the FolderData type
  left: boolean;
  handleCopyButton: (event: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, name: FolderData) => void;
}

const Folder: React.FC<FolderProps> = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder,
  data,
  left,
  handleCopyButton,
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
      if(data?.id) handleInsertNode(data.id, JSON.parse(e.currentTarget.getAttribute('data-data') || '{}'), showInput.isFolder as boolean);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && e.currentTarget.value) {
      if(data?.id) handleUpdateFolder(data.id, JSON.parse(e.currentTarget.getAttribute('data-data') || '{}'), true);
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
    console.log("target", target);
    console.log("draggedItem", draggedItem);
    
    if (target.isFolder) {
      // if (draggedItem.isFolder) {
        const copiedId = handleInsertNode(target.id, draggedItem, draggedItem.isFolder);
        console.log("Copied folder items:", draggedItem, "copiedId", copiedId);
      // }
    }
    // if(data?.id) handleUpdateFolder(data.id, draggedItem.name, draggedItem.isFolder);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (data && data.isFolder) {
    return (
      <div>
        <div
          className="folder"
          style={{ cursor: "pointer" }}
          onClick={() => setExpand(!expand)}
          draggable
          onDragStart={(e) => handleDragStart(e, data)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-data={JSON.stringify(data)}
          key={data.id}
        >
          <span>
            {expand ? <VscChevronDown /> : <VscChevronRight />} <VscFolder />
            {updateInput.visible ? (
              <input
                type="text"
                value={nodeName}
                onChange={handleChange}
                autoFocus
                onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
                onKeyDown={onUpdate}
              />
            ) : (
              <label>{data.name}</label>
            )}
          </span>

          <div className="buttons-container">
            <button onClick={handleDeleteFolder}>
              <VscTrash />
            </button>
            <button onClick={(e) => handleUpdateFolderButton(e, true, data.name)}>
              <VscEdit />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, true)}>
              <VscNewFolder />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, false)}>
              <VscNewFile />
            </button>
          </div>
        </div>
        <div
          id="folderContainer"
          style={{ display: expand ? "block" : "none", marginLeft: 20 }}
        >
          {showInput.visible && (
            <div className="addItem">
              <span>{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAdd}
              />
            </div>
          )}
          {data.items?.map((item, index) => (
            <Folder
              handleDeleteNode={handleDeleteNode}
              handleInsertNode={handleInsertNode}
              handleUpdateFolder={handleUpdateFolder}
              data={item}
              key={index}
              left={left}
              handleCopyButton={handleCopyButton}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (      
      <div
        className="folder"
        draggable
        onDragStart={(e) => handleDragStart(e, data)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <span>
          <VscFile />
          {updateInput.visible ? (
            <input
              type="text"
              value={nodeName}
              onChange={handleChange}
              autoFocus
              onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
              onKeyDown={onUpdate}
            />
          ) : (
            <label>{data ? data.name : ""}</label>
          )}
        </span>
        <div className="buttons-container">
          <button onClick={handleDeleteFolder}>
            <VscTrash />
          </button>
          {data && (
            <button onClick={(e) => handleUpdateFolderButton(e, false, data.name)}>
              <VscEdit />
            </button>
          )}
          {left && data && (
            <button onClick={(e) => handleCopyButton(e, false, data)}>
              <VscArrowRight />
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Folder;