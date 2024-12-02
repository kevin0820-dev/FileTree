import { FolderData } from '../types'; // Import your types

const useTraverseTree = () => {

  // const share:FolderData, mydata: FolderData;

  async function fetchToken(id: string, username: string, password: string, secret: string) {
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
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "Accept":"application/json"
          },
          body: data.toString(),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const { access_token, expires_in, refresh_expires_in, refresh_token, token_type, not_before_policy, session_state, scope } = result;
      return access_token;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  }

  async function fetchSharedData(token: string) {
    const url = 'https://api-dev.ryght.ai/v1/folders/search';
    const data = new URLSearchParams({
      permission: 'CAN_VIEW',
      // isShared: 'true',
      isRoot: 'true',
    });
    try {
      const response = await fetch(`${url}?${data.toString()}`, {
          method: 'GET',
          headers: {
              "Authorization": `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return result;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  }

  async function createFolder(token: string, id: string, folderName: string) {
    const url = 'https://api-dev.ryght.ai/v1/folders';
    const data = new URLSearchParams({
      name: folderName,
      parentFolderId: id,
    });
    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "Accept":"application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: data.toString(),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
        console.error('Error processing data:', error);
        throw error;
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

  return { insertNode, deleteNode, updateNode, fetchToken, fetchSharedData, createFolder };

};

export default useTraverseTree;