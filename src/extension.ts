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

// this method is called when the extension is activated
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

// this method is called when the extension is deactivated
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
    var description = `TODO`;
    var historyItem = new HistoryData(changeTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidCloseTextDocument(e : vscode.TextDocument) {
    var description = `"${e.fileName}"`;
    var historyItem = new HistoryData(closeTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidOpenTextDocument(e : vscode.TextDocument) {
    var description = `"${e.fileName}"`;
    var historyItem = new HistoryData(openTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidSaveTextDocument(e : vscode.TextDocument) {
    var description = `"${e.fileName}"`;
    var historyItem = new HistoryData(saveTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidCreateFiles(e : vscode.FileCreateEvent) {
    if (e.files.length <= 0 || !e.files[0]) {
        return;
    }

    var description = `"${e.files[0].fragment}"`;
    var historyItem = new HistoryData(createFilesLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidDeleteFiles(e : vscode.FileDeleteEvent) {
    if (e.files.length <= 0 || !e.files[0]) {
        return;
    }

    var description = `"${e.files[0].fragment}"`;
    var historyItem = new HistoryData(deleteFilesLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidRenameFiles(e : vscode.FileRenameEvent) {
    if (e.files.length <= 0 || !e.files[0]) {
        return;
    }

    var description = `"${e.files[0].oldUri}" -> "${e.files[0].newUri}"`;
    var historyItem = new HistoryData(renameFilesLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}
