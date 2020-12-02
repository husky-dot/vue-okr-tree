import Node from "./node";
import { getNodeKey } from "./util";
export default class TreeStore {
  constructor(options) {
    this.currentNode = null;
    this.currentNodeKey = null;

    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    this.nodesMap = {};
    this.root = new Node(
      {
        data: this.data,
        store: this
      },
      false
    );

    if (this.root.store.onlyBothTree) {
      if (!this.leftData)
        throw new Error("[Tree] leftData is required in onlyBothTree");
      if (this.leftData) {
        this.isLeftChilds = new Node(
          {
            data: this.leftData,
            store: this
          },
          true
        );
        if (this.isLeftChilds) {
          this.root.childNodes[0].leftChildNodes = this.isLeftChilds.childNodes[0].childNodes;
          this.root.childNodes[0].leftExpanded = this.isLeftChilds.childNodes[0].leftExpanded;
        }
      }
    }
  }
  filter(value, childName = "childNodes") {
    this.filterRight(value, childName);
  }
  // 过滤默认节点
  filterRight(value, childName) {
    const filterNodeMethod = this.filterNodeMethod;
    const traverse = function(node, childName) {
      let childNodes;
      if (node.root) {
        childNodes = node.root.childNodes[0][childName];
      } else {
        childNodes = node.childNodes;
      }
      childNodes.forEach(child => {
        child.visible = filterNodeMethod.call(child, value, child.data, child);
        traverse(child, childName);
      });

      if (!node.visible && childNodes.length) {
        let allHidden = true;
        allHidden = !childNodes.some(child => child.visible);

        if (node.root) {
          node.root.visible = allHidden === false;
        } else {
          node.visible = allHidden === false;
        }
      }
      if (!value) return;

      if (node.visible) node.expand();
    };

    traverse(this, childName);
  }

  registerNode(node) {
    const key = this.key;
    if (!key || !node || !node.data) return;

    const nodeKey = node.key;
    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
  }
  deregisterNode(node) {
    const key = this.key;
    if (!key || !node || !node.data) return;
    node.childNodes.forEach(child => {
      this.deregisterNode(child);
    });
    delete this.nodesMap[node.key];
  }
  setData(newVal) {
    const instanceChanged = newVal !== this.root.data;
    if (instanceChanged) {
      this.root.setData(newVal);
    } else {
      this.root.updateChildren();
    }
  }
  updateChildren(key, data) {
    const node = this.nodesMap[key];
    if (!node) return;
    const childNodes = node.childNodes;
    for (let i = childNodes.length - 1; i >= 0; i--) {
      const child = childNodes[i];
      this.remove(child.data);
    }
    for (let i = 0, j = data.length; i < j; i++) {
      const child = data[i];
      this.append(child, node.data);
    }
  }
  getNode(data) {
    if (data instanceof Node) return data;
    const key = typeof data !== "object" ? data : getNodeKey(this.key, data);
    return this.nodesMap[key] || null;
  }
  setDefaultExpandedKeys(keys) {
    keys = keys || [];
    this.defaultExpandedKeys = keys;
    keys.forEach(key => {
      const node = this.getNode(key);
      if (node) node.expand(null, true);
    });
  }
  setCurrentNode(currentNode) {
    const prevCurrentNode = this.currentNode;
    if (prevCurrentNode) {
      prevCurrentNode.isCurrent = false;
    }
    this.currentNode = currentNode;
    this.currentNode.isCurrent = true;
  }
  setUserCurrentNode(node) {
    const key = node.key;
    const currNode = this.nodesMap[key];
    this.setCurrentNode(currNode);
  }
  setCurrentNodeKey(key) {
    if (key === null || key === undefined) {
      this.currentNode && (this.currentNode.isCurrent = false);
      this.currentNode = null;
      return;
    }
    const node = this.getNode(key);
    if (node) {
      this.setCurrentNode(node);
    }
  }
  getCurrentNode() {
    return this.currentNode;
  }
  remove(data) {
    const node = this.getNode(data);
    if (node && node.parent) {
      if (node === this.currentNode) {
        this.currentNode = null;
      }
      node.parent.removeChild(node);
    }
  }
  append(data, parentData) {
    const parentNode = parentData ? this.getNode(parentData) : this.root;

    if (parentNode) {
      parentNode.insertChild({ data });
    }
  }
  insertBefore(data, refData) {
    const refNode = this.getNode(refData);
    refNode.parent.insertBefore({ data }, refNode);
  }
  insertAfter(data, refData) {
    const refNode = this.getNode(refData);
    refNode.parent.insertAfter({ data }, refNode);
  }
}
