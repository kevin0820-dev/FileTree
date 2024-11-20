import { FolderData } from "../types";

const folderData: FolderData = {
  id: "1",
  name: "Shared",
  isFolder: true,
  group: "folder",
  items: [
    {
      id: "2",
      name: "Transcriptions",
      isFolder: true,
      group: "collection",
      items: [],
    },
    {
      id: "3",
      name: "Pubmed Research",
      isFolder: true,
      group: "image",
      items: [],
    },
    {
      id: "4",
      name: "Trials",
      isFolder: true,
      group: "document",
      items: [],
    },
    {
      id: "5",
      name: "Protocals",
      isFolder: true,
      group: "protocol",
      items: [
        
        {
          id: "6",
          name: "Breast Cancer Protocol",
          isFolder: false,
          group: "image",
          items: [],
        },
        {
          id: "7",
          name: "Lung Cancer Protocol",
          isFolder: false,
          group: "protocol",
          items: [],
        },
      ],
    },
    {
      id: "8",
      name: "Feasibility Questionnaires",
      isFolder: true,
      group: "feasibility",
      items: [
        {
          id: "9",
          name: "Georgetown Brain Q",
          isFolder: false,
          group: "feasibility",
          items: [],
        },
        {
          id: "10",
          name: "MD Anderson Breast Q",
          isFolder: false,
          group: "document",
          items: [],
        },
        {
          id: "11",
          name: "Hopkins Lung Q",
          isFolder: false,
          group: "note",
          items: [],
        },
      ],
    },
    {
      id: "12",
      name: "Documents",
      isFolder: true,
      group: "google",
      items: [
        {
          id: "13",
          name: "FDA Drug Approval",
          isFolder: false,
          group: "study",
          items: [],
        },
        {
          id: "14",
          name: "Newest Breast Cancer Treatments",
          isFolder: false,
          group: "note",
          items: [],
        },
      ],
    },
    {
      id: "15",
      name: "Collections",
      isFolder: true,
      group: "note",
      items: [
        {
          id: "16",
          name: "USC Cancer Protocols",
          isFolder: false,
          group: "file",
          items: [],
        },
        {
          id: "17",
          name: "Mayo Protocols",
          isFolder: false,
          group: "file",
          items: [],
        },
      ],
    },
    {
      id: "18",
      name: "Notes",
      isFolder: false,
      group: "file",
      items: [],
    },
  ],
};

export default folderData;
