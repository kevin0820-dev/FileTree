import { FolderData } from '../types'; // Import your types

const useTraverseTree = () => {
  function insertNode(
    tree: FolderData,
    folderId: string,
    copiedItem: FolderData,
    isFolder: boolean
  ): FolderData | undefined {

    if (tree.id === folderId && tree.isFolder) {
      let isItemExists = false;
      tree.items.forEach((item) => {
        if(item.name === copiedItem.name){
          alert('Item already exists!');
          isItemExists = true;
          return;
        }
      })
      if(isItemExists){
        return;
      }
      
      const newItem = {
        id: new Date().getTime().toString(),
        name: copiedItem.name,
        isFolder: isFolder,
        group: copiedItem.group,
        shared: copiedItem.shared,
        items: copiedItem.items,
      };
      const newItemUpdated = updateIds(newItem);
      tree.items.unshift(newItemUpdated);
      return newItemUpdated;
    }    
    for (const obj of tree.items) {
      const res = insertNode(obj, folderId, copiedItem, isFolder);
      if (res) {
        return res;
      }
    }
  }
  const updateIds = (node: FolderData): FolderData => {
    const updatedNode = { ...node, id: (new Date().getTime().toString() + node.id) }; // Update the ID
    if (updatedNode.items) {
      updatedNode.items = updatedNode.items.map(updateIds); // Recursively update children's IDs
    }
    return updatedNode;
  };

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