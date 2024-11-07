const myData = {
  id: "1",
  name: "My Folder",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "Cancer Files",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "leukocytes.png",
          isFolder: false,
          items: [],
        },
        {
          id: "4",
          name: "leukomia.txt",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: "7",
      name: "images",
      isFolder: true,
      items: [
        {
          id: "8",
          name: "tongue.tiff",
          isFolder: false,
          items: [],
        },
        {
          id: "9",
          name: "virus.gif",
          isFolder: false,
          items: [],
        },
        {
          id: "10",
          name: "microbes.jpg",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: "11",
      name: "help.docx",
      isFolder: false,
      items: [],
    },
  ],
};

export default myData;

const datas = {
  "Shared with me": {
    "Transcriptions": {},
    "Pubmed Research": {},
    "Trials": {},
    "Informed Consent": {
      "Consent 1": {},
      "Consent 2": {}
    },
    "Protocols": {
      "Breast Cancer Protocol": {},
      "Lung Cancer Protocol": {}
    },
    "Feasibility Questionnaires": {
      "Georgetown Brain Q": {},
      "MD Anderson Breast Q": {},
      "Hopkins Lung Q": {}
    },
    "Documents": {
      "FDA Drug Approval": {},
      "Newest Breast Cancer Treatments": {}
    },
    "Collections": {
      "USC Cancer Protocols": {},
      "Mayo Protocols": {}
    },
    "Notes": {}
  }
}