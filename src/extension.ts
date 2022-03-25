// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CircularBuffer from "circularbuffer";
import {HistoryData, HistoryItemProvider} from "./HistoryItemProvider"
import { TextChangeBatch } from './TextChangeBatch';

const historyBufferSize = 100;

let historyBuffer = new CircularBuffer<HistoryData>(historyBufferSize);
let historyItemProvider = new HistoryItemProvider(historyBuffer);

let treeDataDisposable : vscode.Disposable;

let changeTextDisposable : vscode.Disposable;
let closeTextDisposable : vscode.Disposable;
let openTextDispoable : vscode.Disposable;
let saveTextDisposable : vscode.Disposable;

let createFilesDisposable : vscode.Disposable;
let deleteFilesDisposable : vscode.Disposable;
let renameFilesDisposable : vscode.Disposable;

const changeTextLabel = "Change Document";
const closeTextLabel = "Close Document";
const openTextLabel = "Open Document";
const saveTextLabel = "Save Document";

const createFilesLabel = "Create File";
const deleteFilesLabel = "Delete File";
const renameFilesLabel = "Rename File";

let currentBatch : TextChangeBatch = new TextChangeBatch();

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
    currentBatch.batch(e);
    let description = `"${e.contentChanges}"`;
    let historyItem = new HistoryData(changeTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidCloseTextDocument(e : vscode.TextDocument) {
    let description = `"${e.fileName}"`;
    let historyItem = new HistoryData(closeTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidOpenTextDocument(e : vscode.TextDocument) {
    let description = `"${e.fileName}"`;
    let historyItem = new HistoryData(openTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidSaveTextDocument(e : vscode.TextDocument) {
    let description = `"${e.fileName}"`;
    let historyItem = new HistoryData(saveTextLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidCreateFiles(e : vscode.FileCreateEvent) {
    if (e.files.length <= 0 || !e.files[0]) {
        return;
    }

    let description = `"${e.files[0].fragment}"`;
    let historyItem = new HistoryData(createFilesLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidDeleteFiles(e : vscode.FileDeleteEvent) {
    if (e.files.length <= 0 || !e.files[0]) {
        return;
    }

    let description = `"${e.files[0].fragment}"`;
    let historyItem = new HistoryData(deleteFilesLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}

function handleDidRenameFiles(e : vscode.FileRenameEvent) {
    if (e.files.length <= 0 || !e.files[0]) {
        return;
    }

    let description = `"${e.files[0].oldUri}" -> "${e.files[0].newUri}"`;
    let historyItem = new HistoryData(renameFilesLabel, description);
    historyBuffer.enq(historyItem);
    historyItemProvider.refresh();
}
