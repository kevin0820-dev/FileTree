import { FolderData } from '../types'; // Import your types

const useTraverseTree = () => {

  // const share:FolderData, mydata: FolderData;

  async function fetchData(id: string, username: string, password: string, secret: string) {
    const url = 'https://auth-dev.ryght.ai/auth/realms/ryght-realm/protocol/openid-connect/token';
    const data = new URLSearchParams({
      grant_type: 'password',
      client_id: id,
      username: username,
      password: password,
      client_secret: secret,
      organization: 'Ryght',
      realm: 'ryght-realm'
  });
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data.toString(),
      });

      console.log(response);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const { access_token, expires_in, refresh_expires_in, refresh_token, token_type, not_before_policy, session_state, scope } = result;

      // Handle the result as needed
      console.log('Access Token:', access_token);
      return result; // Return the result or handle it as needed
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error if needed
    }
  }
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

  return { insertNode, deleteNode, updateNode, fetchData };

};

export default useTraverseTree;