
import "./App.css";
import folderData from "./data/folderData";
import customData from "./data/myData";
import FilePane from "./components/FilePane/FilePane";
import { useCallback, useState } from "react";
import { FolderData } from "./types";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {

  const { insertNode, fetchData } = useTraverseTree();
  const [rightData, setRightData] = useState<FolderData | null>(folderData);
  const [myData, setMyData] = useState<FolderData | null>(customData);
  
  fetchData("ryght-client", "kevinjohn0820@gmail.com", "greatgreat0721", "X7O6SetFrC8Q8QUYhMHxQ2c4xNmE8JnO");

  const handleCopyButton = useCallback((isFolder: boolean, name: string) => {
    const copiedItem = {
      id: new Date().getTime().toString(),
      name: name,
      isFolder: isFolder,
      group: isFolder ? "folder" : "file",
      shared: myData?.shared ? myData.shared : "by",
      items: [],
    }
    if(myData){
      const finalItem = insertNode(myData, myData.id, copiedItem, isFolder);
    }
  }, []);

  return (
    <div className="App">
      <div className="grid grid-cols-[0.5fr_2fr] gap-4 h-[calc(100vh-10px)]">
        <FilePane
          data={rightData}
          setData={setRightData}
          left={true}
          handleCopyButton={handleCopyButton}
        />
        <FilePane
          data={myData}
          setData={setMyData}
          left={false}
          handleCopyButton={handleCopyButton}
        />
      </div>
    </div>
  );
}

export default App;