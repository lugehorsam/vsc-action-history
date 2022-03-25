import * as vscode from 'vscode';
import CircularBuffer from "circularbuffer";

export class HistoryData {
    constructor(readonly label : string, readonly description : string) {}
}

export class HistoryItemProvider implements vscode.TreeDataProvider<HistoryData> {
    private _onDidChangeTreeData: vscode.EventEmitter<HistoryData | undefined | void> = new vscode.EventEmitter<HistoryData | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<HistoryData | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private readonly historyBuffer : CircularBuffer<HistoryData>) {}

    refresh(): void {
		this._onDidChangeTreeData.fire();
	}

    getTreeItem(item: HistoryData): vscode.TreeItem {
        let treeItem = new vscode.TreeItem(item.label);
        treeItem.description = item.description;
        return treeItem;
    }

    getChildren(item?: HistoryData): Thenable<HistoryData[]> {
        if (item) {
            // each item has no children.
            return Promise.resolve([]);
        } else {
            // no history data populated yet, populate root container.
            return Promise.resolve(this.historyBuffer.toArray());
        }
    }
}
