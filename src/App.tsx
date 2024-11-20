
import "./App.css";
import folderData from "./data/folderData";
import customData from "./data/myData";
import FilePane from "./components/FilePane/FilePane";
import { useState } from "react";
import { FolderData } from "./types";

function App() {

  const [rightData, setRightData] = useState<FolderData | null>(folderData);
  const [myData, setMyData] = useState<FolderData | null>(customData);

  return (
    <div className="App">
      <div className="grid grid-cols-[0.5fr_2fr] gap-4 h-[calc(100vh-10px)]">
        <FilePane
          data={rightData}
          setData={setRightData}
          left={true}
        />
        <FilePane
          data={myData}
          setData={setMyData}
          left={false}
        />
      </div>
    </div>
  );
}

export default App;