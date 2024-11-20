
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

const FolderItem: React.FC<FolderItemProps> = ({
    handleInsertNode,
    handleDeleteNode,
    handleUpdateFolder,
    data,
    left,
    handleCopyButton,
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
        <div className="h-full" onDragOver={(e) => e.preventDefault()} onDrop={handleWrapperDrop}>
            <div
            className="group bg-white flex items-center justify-between p-[5px] w-[300px] relative group hover:bg-[rgb(194,186,186)] hover:rounded-[5px]"
            style={{ cursor: "pointer" }}
            onClick={() => setExpand(!expand)}
            draggable
            onDragStart={(e) => handleDragStart(e, data)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-data={JSON.stringify(data)}
            key={data?.id}
            >
            <span className="text-black flex items-center">
                {left && data?.shared === "by" && <FaHandPointLeft />}
                {!left && data?.shared === "with" && <FaHandPointRight />}
                {expand ? <VscChevronDown /> : <VscChevronRight />} {iconMap[data?.group as IconGroup]}
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
                <span className="truncate max-w-36 hover:max-w-full">{data?.name}</span>
                )}
            </span>

            <div className="flex invisible group-hover:visible">
                <button className="text-[16px] bg-transparent text-black border-0 cursor-pointer px-1" onClick={handleDeleteFolder}>
                <VscTrash />
                </button>
                <button className="text-[16px] bg-transparent text-black border-0 cursor-pointer px-1" onClick={(e) => handleUpdateFolderButton(e, true, data?.name ?? '')}>
                <VscEdit />
                </button>
                <button className="text-[16px] bg-transparent text-black border-0 cursor-pointer px-1" onClick={(e) => handleNewFolderButton(e, true)}>
                <VscNewFolder />
                </button>
                <button className="text-[16px] bg-transparent text-black border-0 cursor-pointer px-1" onClick={(e) => handleNewFolderButton(e, false)}>
                <VscNewFile />
                </button>
            </div>
            </div>
            <div
            id="folderContainer"
            style={{ display: expand ? "block" : "none", marginLeft: 20 }}
            >
            {showInput.visible && (
                <div className="bg-white flex items-center p-[5px] w-[300px] relative">
                <span className="text-black flex items-center pr-[5px]">{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
                <input
                    type="text"
                    autoFocus
                    onBlur={() => setShowInput({ ...showInput, visible: false })}
                    onKeyDown={onAdd}
                />
                </div>
            )}
            {data?.items?.map((item, index) => (
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
    )
}

export default FolderItem;
