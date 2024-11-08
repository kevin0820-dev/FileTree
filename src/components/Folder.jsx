import { useState } from "react";
import PropTypes from 'prop-types';
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
  // VscBook,
  // VscEye,
  // VscPlay,
  // VscFileMedia,
  // VscQuestion,
  // VscCollapseAll,
  // VscNote,
  // VscProject
} from "react-icons/vsc";

const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder,
  data,
  left,
  handleCopyButton,
}) => {
  Folder.propTypes = {
    handleInsertNode: PropTypes.func.isRequired,
    handleDeleteNode: PropTypes.func.isRequired,
    handleUpdateFolder: PropTypes.func.isRequired,
    left: PropTypes.bool.isRequired,
    handleCopyButton: PropTypes.func,
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isFolder: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  };

  const [nodeName, setNodeName] = useState(
    data?.name ? data.name : ""
  );
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [updateInput, setUpdateInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolderButton = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleUpdateFolderButton = (e, isFolder, nodeValue) => {
    setNodeName(nodeValue);
    e.stopPropagation();
    setUpdateInput({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    handleDeleteNode(data.id);
  };

  const onAdd = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(data.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onUpdate = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleUpdateFolder(data.id, e.target.value, true);
      setUpdateInput({ ...updateInput, visible: false });
    }
  };

  const handleChange = (event) => {
    setNodeName(event.target.value);
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    const target = JSON.parse(e.currentTarget.getAttribute('data'));
    console.log("target", target);
    
    if (target.isFolder) {
      if (draggedItem.isFolder) {
        var copiedId = handleInsertNode(target.id, draggedItem.name, draggedItem.isFolder);
        draggedItem.items.forEach(item => {
          handleInsertNode(copiedId.id, item.name, item.isFolder);
        });
        console.log("Copied folder items:", draggedItem, "copiedId", copiedId);
      }
      else {
        var copiedIdFile = handleInsertNode(target.id, draggedItem.name, draggedItem.isFolder);
        console.log("Copied folder items:", draggedItem, "copiedId", copiedIdFile);
      }
    }
    handleUpdateFolder();
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // console.log(data);
  if (data.isFolder) {
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
          data={JSON.stringify(data)}
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
                onBlur={() =>
                  setUpdateInput({ ...updateInput, visible: false })
                }
                onKeyDown={onUpdate}
              />
            ) : (
              <label>{data.name}</label>
            )}
          </span>

          <div className="buttons-container">
            <button onClick={(e) => handleDeleteFolder(e)}>
              <VscTrash />
            </button>
            <button
              onClick={(e) =>
                handleUpdateFolderButton(e, true, data.name)
              }
            >
              <VscEdit />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, true)}>
              <VscNewFolder />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, false)}>
              <VscNewFile />
            </button>
            {/* {left && <button onClick={(e) => handleCopyButton(e, false)}>
              <VscArrowRight />
            </button>} */}
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
          {data.items.map((item, index) => {
            return (
              <Folder
                handleDeleteNode={handleDeleteNode}
                handleInsertNode={handleInsertNode}
                handleUpdateFolder={handleUpdateFolder}
                data={item}
                key={index}
                left={left}
                handleCopyButton={handleCopyButton}
              />
            );
          })}
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="folder"
         draggable 
         onDragStart={(e) => handleDragStart(e, data)} 
         onDragOver={handleDragOver} 
         onDrop={handleDrop}>
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
            <label>{data.name}</label>
          )}
        </span>
        <div className="buttons-container">
          <button onClick={(e) => handleDeleteFolder(e)}>
            <VscTrash />
          </button>
          <button
            onClick={(e) =>
              handleUpdateFolderButton(e, false, data.name)
            }
          >
            <VscEdit />
          </button>
          {
            left && <button onClick={(e) => handleCopyButton(e, false, data.name)}>
              <VscArrowRight />
            </button>
          }
        </div>
      </div>
    );
  }
};

export default Folder;