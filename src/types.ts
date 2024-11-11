export interface Item {
    id: string;
    name: string;
    isFolder: boolean;
    items: Item[];
}
  
export interface FolderData {
    id: string;
    name: string;
    isFolder: boolean;
    items: Item[];
}