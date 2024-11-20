
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
import { FolderData } from "../../../types";
import Folder from "../Folder";

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
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa6";

interface FolderItemProps {
    handleInsertNode: (folderId: string, itemName: FolderData, isFolder: boolean) => FolderData|undefined;
    handleDeleteNode: (folderId: string) => void;
    handleUpdateFolder: (id: string, updatedValue: string, isFolder: boolean) => void;
    data: FolderData|null;
    left: boolean;
    root: string;
    handleCopyButton: (event: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, name: string) => void;
    expand: boolean;
    setExpand: (expand: boolean) => void;
    handleWrapperDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, data: any) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    updateInput: { visible: boolean; isFolder: boolean | null };
    setUpdateInput: (updateInput: { visible: boolean; isFolder: boolean | null }) => void;
    nodeName: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onUpdate: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleDeleteFolder: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleUpdateFolderButton: (event: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, name: string) => void;
    handleNewFolderButton: (event: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => void;
    showInput: { visible: boolean; isFolder: boolean | null };
    setShowInput: (showInput: { visible: boolean; isFolder: boolean | null }) => void;
    onAdd: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FileItem: React.FC<FolderItemProps> = ({
    handleInsertNode,
    handleDeleteNode,
    handleUpdateFolder,
    data,
    left,
    handleCopyButton,
    root,
    expand,
    setExpand,
    handleWrapperDrop,
    handleDragStart,
    handleDragOver,
    handleDrop,
    updateInput,
    setUpdateInput,
    nodeName,
    handleChange,
    onUpdate,
    handleDeleteFolder,
    handleUpdateFolderButton,
    handleNewFolderButton,
    showInput,
    setShowInput,
    onAdd,
}) => {
  return (
    <div
        className="bg-white flex items-center justify-between p-[5px] w-[300px] relative group hover:bg-[rgb(194,186,186)] hover:rounded-[5px]"
        draggable
        onDragStart={(e) => handleDragStart(e, data)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >        
        <span className="text-black flex items-center">
          {root === "with" && data?.shared === "by" && <FaHandPointLeft />}
          {root === "by" && data?.shared === "with" && <FaHandPointRight />}
          {iconMap[data?.group as IconGroup]}
          {updateInput.visible ? (
            <input
              type="text"
              className="w-[75%] ml-[5px]"
              value={nodeName}
              onChange={handleChange}
              autoFocus
              onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
              onKeyDown={onUpdate}
            />
          ) : (
            <span className="truncate max-w-36 hover:max-w-full">{data ? data.name : ""}</span>
          )}
        </span>
        <div className="flex invisible group-hover:visible">
          <button className="text-[16px] bg-transparent text-black border-0 cursor-pointer px-1" onClick={handleDeleteFolder}>
            <VscTrash />
          </button>
          {data && (
            <button className="text-[16px] bg-transparent text-black border-0 cursor-pointer px-1" onClick={(e) => handleUpdateFolderButton(e, false, data.name)}>
              <VscEdit />
            </button>
          )}
          {left && data && (
            <button className="text-[16px] bg-transparent text-black border-0 cursor-pointer px-1" onClick={(e) => handleCopyButton(e, false, data.name)}>
              <VscArrowRight />
            </button>
          )}
        </div>
      </div>
  )
}

export default FileItem;
