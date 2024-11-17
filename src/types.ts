export interface Item {
    id: string;
    name: string;
    isFolder: boolean;
    group: string;
    items: Item[];
}
  
export interface FolderData {
    id: string;
    name: string;
    isFolder: boolean;
    group: string;
    items: Item[];
}