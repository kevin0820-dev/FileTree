
import "./App.css";
import customData from "./data/myData";
import FilePane from "./components/FilePane/FilePane";
import { useCallback, useEffect, useState } from "react";
import { FolderData } from "./types";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {

  const { insertNode, fetchToken, fetchSharedData, createFolder } = useTraverseTree();
  const [rightData, setRightData] = useState<FolderData | null>(null);
  const [myData, setMyData] = useState<FolderData | null>(customData);
  const [userToken, setUserToken] = useState<string>("");
  
  useEffect(() => {
    fetchToken("ryght-client", "kevinjohn0820@gmail.com", "greatgreat0721", "X7O6SetFrC8Q8QUYhMHxQ2c4xNmE8JnO").then((token) => {
      setUserToken(token);
      console.log(token);
    });
  }, []);

  useEffect(() => {
    fetchSharedData(userToken).then((sharedData) => {
      const dataset: FolderData[] = [];
      sharedData.content.forEach((shared:any) => {
        const data: FolderData = {
          id: shared.id,
          name: shared.name,
          isFolder: true,
          group: "folder",
          shared: "with",
          items: shared.items,
        }
        dataset.push(data);
      });
      setRightData(dataset[0]);
    });
  }, [userToken]);

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