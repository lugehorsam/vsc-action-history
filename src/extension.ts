// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CircularBuffer from "circularbuffer";

const bufferSize = 100;

var historyBuffer = new CircularBuffer(bufferSize);

var changeTextDisposable : vscode.Disposable;
var closeTextDisposable : vscode.Disposable;
var openTextDispoable : vscode.Disposable;
var saveTextDisposable : vscode.Disposable;

var createFilesDisposable : vscode.Disposable;
var deleteFilesDisposable : vscode.Disposable;
var renameFilesDisposable : vscode.Disposable;

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

}

function handleDidCloseTextDocument(e : vscode.TextDocument) {

}

function handleDidOpenTextDocument(e : vscode.TextDocument) {

}

function handleDidSaveTextDocument(e : vscode.TextDocument) {

}

function handleDidCreateFiles(e : vscode.FileCreateEvent) {

}

function handleDidDeleteFiles(e : vscode.FileDeleteEvent) {

}

function handleDidRenameFiles(e : vscode.FileRenameEvent) {

}
