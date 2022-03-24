// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CircularBuffer from "circularbuffer";

const bufferSize = 100;

var historyBuffer = new CircularBuffer<HistoryItem>(bufferSize);

var changeTextDisposable : vscode.Disposable;
var closeTextDisposable : vscode.Disposable;
var openTextDispoable : vscode.Disposable;
var saveTextDisposable : vscode.Disposable;

var createFilesDisposable : vscode.Disposable;
var deleteFilesDisposable : vscode.Disposable;
var renameFilesDisposable : vscode.Disposable;

var changeTextLabel : string = "Change Document";
var closeTextLabel : string = "Close Document";
var openTextLabel : string = "Open Document";
var saveTextLabel : string = "Save Document";

var createFilesLabel : string = "Create File";
var deleteFilesLabel : string = "Delete File";
var renameFilesLabel : string = "Rename File";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    changeTextDisposable = vscode.workspace.onDidChangeTextDocument(handleDidChangeTextDocument);
    closeTextDisposable = vscode.workspace.onDidCloseTextDocument(handleDidCloseTextDocument);
    openTextDispoable = vscode.workspace.onDidOpenTextDocument(handleDidOpenTextDocument);
    saveTextDisposable = vscode.workspace.onDidSaveTextDocument(handleDidSaveTextDocument);

    createFilesDisposable = vscode.workspace.onDidCreateFiles(handleDidCreateFiles);
    deleteFilesDisposable = vscode.workspace.onDidDeleteFiles(handleDidDeleteFiles);
    renameFilesDisposable = vscode.workspace.onDidRenameFiles(handleDidRenameFiles);
}

// this method is called when your extension is deactivated
export function deactivate() {
    changeTextDisposable?.dispose();
    closeTextDisposable?.dispose();
    openTextDispoable?.dispose();
    saveTextDisposable?.dispose();

    createFilesDisposable?.dispose();
    deleteFilesDisposable?.dispose();
    renameFilesDisposable?.dispose();
}

function handleDidChangeTextDocument(e : vscode.TextDocumentChangeEvent) {
    var historyItem = new HistoryItem(changeTextLabel);
    historyBuffer.enq(historyItem);
}

function handleDidCloseTextDocument(e : vscode.TextDocument) {
    var historyItem = new HistoryItem(closeTextLabel);
    historyBuffer.enq(historyItem);
}

function handleDidOpenTextDocument(e : vscode.TextDocument) {
    var historyItem = new HistoryItem(openTextLabel);
    historyBuffer.enq(historyItem);
}

function handleDidSaveTextDocument(e : vscode.TextDocument) {
    var historyItem = new HistoryItem(saveTextLabel);
    historyBuffer.enq(historyItem);
}

function handleDidCreateFiles(e : vscode.FileCreateEvent) {
    var historyItem = new HistoryItem(createFilesLabel);
    historyBuffer.enq(historyItem);
}

function handleDidDeleteFiles(e : vscode.FileDeleteEvent) {
    var historyItem = new HistoryItem(deleteFilesLabel);
    historyBuffer.enq(historyItem);
}

function handleDidRenameFiles(e : vscode.FileRenameEvent) {
    var historyItem = new HistoryItem(renameFilesLabel);
    historyBuffer.enq(historyItem);
}

class HistoryItem extends vscode.TreeItem {
    constructor(label : string) {
        super(label);
    }
}

export class HistoryItemProvider implements vscode.TreeDataProvider<HistoryItem> {
    constructor() {}

    getTreeItem(item: HistoryItem): vscode.TreeItem {
        return item;
    }

    getChildren(item?: HistoryItem): Thenable<HistoryItem[]> {
        return item;
    }
}
