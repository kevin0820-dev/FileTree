import { FolderData } from '../types'; // Import your types

const useTraverseTree = () => {
  function insertNode(
    tree: FolderData,
    folderId: string,
    itemName: string,
    isFolder: boolean
  ): FolderData | undefined {
    if (tree.id === folderId && tree.isFolder) {
      const newItem = {
        id: new Date().getTime().toString(),
        name: itemName,
        isFolder: isFolder,
        items: [],
      };
      tree.items.unshift(newItem);
      return newItem;
    }

    for (const obj of tree.items) {
      const res = insertNode(obj, folderId, itemName, isFolder);
      if (res) {
        return res;
      }
    }
  }

  function deleteNode(tree: FolderData, folderId: string): FolderData | null {
    if (tree.id === folderId) {
      return null;
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.map((child) => deleteNode(child, folderId)).filter(Boolean) as FolderData[];
    }

    return { ...tree };
  }

  function updateNode(tree: FolderData, folderId: string, itemName: string): FolderData {
    if (tree.id === folderId) {
      return {
        ...tree,
        name: itemName,
      };
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.map((child) => updateNode(child, folderId, itemName));
    }

    return { ...tree };
  }

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;