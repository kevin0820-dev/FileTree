import { FolderData } from "../types";

const myData:FolderData = {
  id: "1",
  name: "My Folder",
  isFolder: true,
  group: "folder",
  items: [{
    id: "2",
    name: "Transcriptions",
    isFolder: true,
    group: "transcription",
    items: [],
  }],
};

export default myData;
