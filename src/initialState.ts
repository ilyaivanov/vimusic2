import { TreeNode } from "./types";

export const nodes: TreeNode = {
  "1": { imageUrl: "https://picsum.photos/g/50/50/?length=30", title: "Carbon Based Lifeforms", id: "1" },
  "2": { imageUrl: "https://picsum.photos/g/50/50/?length=31", title: "Sync24", id: "2", children: ["4", "5"] },
  "3": { imageUrl: "https://picsum.photos/g/50/50/?length=32", title: "Cell", id: "3" },

  "4": { imageUrl: "https://picsum.photos/g/50/50/?length=33", title: "Sync24 - Album 1", id: "4" },
  "5": { imageUrl: "https://picsum.photos/g/50/50/?length=34", title: "Sync24 - Album 1", id: "5" }
};

export const rootNodes = ["1", "2", "3"];
