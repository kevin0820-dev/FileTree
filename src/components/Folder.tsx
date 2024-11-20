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
  VscListUnordered,
  VscPlayCircle,
  VscCombine, 
  VscBook,
  VscDeviceCamera,
  VscFilePdf,
  VscQuote,
  VscNotebook,
  VscMention,
} from "react-icons/vsc";

import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa6";

import { FolderData } from '../types';

type IconGroup = keyof typeof iconMap;
const iconMap = {
  "folder": <VscFolder className="text-blue-500"/>,
  "file": <VscFile className="text-green-500"/>,
  "collection": <VscListUnordered className="text-red-500"/>,
  "image": <VscDeviceCamera className="text-purple-500"/>,
  "document": <VscFilePdf className="text-orange-500"/>,
  "protocol": <VscBook className="text-yellow-500"/>,
  "feasibility": <VscQuote className="text-pink-500"/>,
  "google": <VscCombine className="text-blue-500"/>,
  "note": <VscNotebook className="text-green-500"/>,
  "study": <VscPlayCircle className="text-purple-500"/>,
  "transcription": <VscMention className="text-orange-500"/>,
}
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
      // if (draggedItem.isFolder) {
      const copiedId = handleInsertNode(target.id, draggedItem, draggedItem.isFolder);
      console.log("Copied folder items:", draggedItem, "copiedId", copiedId);
    // }
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
      <div className="wrapper" onDragOver={(e) => e.preventDefault()} onDrop={handleWrapperDrop}>
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
            {root === "with" && data.shared === "by" && <FaHandPointLeft />}
            {root === "by" && data.shared === "with" && <FaHandPointRight />}
            {expand ? <VscChevronDown /> : <VscChevronRight />} {iconMap[data.group as IconGroup]}
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
              root={root}
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
          {root === "with" && data?.shared === "by" && <FaHandPointLeft />}
          {root === "by" && data?.shared === "with" && <FaHandPointRight />}
          {iconMap[data?.group as IconGroup]}
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
            <button onClick={(e) => handleCopyButton(e, false, data.name)}>
              <VscArrowRight />
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Folder;