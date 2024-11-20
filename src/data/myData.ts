import { FolderData } from "../types";

const myData:FolderData = {
  id: "1",
  name: "My Folder",
  isFolder: true,
  group: "folder",
  shared: "by",
  items: [{
    id: "2",
    name: "Transcriptions",
    isFolder: true,
    group: "transcription",
    items: [],
    shared: "by",
  }],
};

export default myData;
