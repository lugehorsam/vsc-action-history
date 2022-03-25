// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CircularBuffer from "circularbuffer";
import {HistoryData, HistoryItemProvider} from "./HistoryItemProvider"

const historyBufferSize = 100;

var historyBuffer = new CircularBuffer<HistoryData>(historyBufferSize);
var historyItemProvider = new HistoryItemProvider(historyBuffer);

var treeDataDisposable : vscode.Disposable;

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
    // register tree before event handlers
    treeDataDisposable = vscode.window.registerTreeDataProvider(
        "action-history-list",
        historyItemProvider);

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

    // dispose tree after event handlers
    treeDataDisposable?.dispose();
}

function handleDidChangeTextDocument(e : vscode.TextDocumentChangeEvent) {
    var historyItem = new HistoryData(changeTextLabel);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidCloseTextDocument(e : vscode.TextDocument) {
    var historyItem = new HistoryData(closeTextLabel);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidOpenTextDocument(e : vscode.TextDocument) {
    var historyItem = new HistoryData(openTextLabel);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidSaveTextDocument(e : vscode.TextDocument) {
    var historyItem = new HistoryData(saveTextLabel);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidCreateFiles(e : vscode.FileCreateEvent) {
    var historyItem = new HistoryData(createFilesLabel);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidDeleteFiles(e : vscode.FileDeleteEvent) {
    var historyItem = new HistoryData(deleteFilesLabel);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidRenameFiles(e : vscode.FileRenameEvent) {
    var historyItem = new HistoryData(renameFilesLabel);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}
