import * as vscode from 'vscode';

export class TextChangeBatch {

    private changeEvents : vscode.TextDocumentChangeEvent[] = []

    constructor(private readonly document : vscode.TextDocument) {
        if (!document) {
            throw "Invalid document passed to text change batch.";
        }
    }

    isBatchDocument(document : vscode.TextDocument) : boolean {
        return document.uri == this.document.uri
    }

    getBatch() : vscode.TextDocumentChangeEvent {
        let batchedEvent : vscode.TextDocumentChangeEvent = {
            document: this.document,
            contentChanges: this.changeEvents.flatMap(evt => evt.contentChanges),
            reason: undefined
        };

        return batchedEvent;
    }

    batch(e : vscode.TextDocumentChangeEvent) {
        if (!this.isBatchDocument(e.document)) {
            throw "Tried to batch text changes to a mismatched document.";
        }

        this.changeEvents.push(e);
    }
}
