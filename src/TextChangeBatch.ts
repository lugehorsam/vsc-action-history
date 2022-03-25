import * as vscode from 'vscode';

export class TextChangeBatch {

    private changeEvents : vscode.TextDocumentChangeEvent[] = []
    private document? : vscode.TextDocument;

    belongsToDocument(document : vscode.TextDocument) : boolean {
        if (!this.document) {
            return false;
        }

        return document.uri == this.document.uri
    }

    hasDocument() : boolean {
        return this.document != null && this.document != undefined;
    }

    getBatch() : vscode.TextDocumentChangeEvent {
        if (!this.hasDocument()) {
            throw "Tried to obtain batched changes from a batch with no document.";
        }

        let batchedEvent : vscode.TextDocumentChangeEvent = {
            document: this.document!,
            contentChanges: this.changeEvents.flatMap(evt => evt.contentChanges),
            reason: undefined
        };

        return batchedEvent;
    }

    batch(e : vscode.TextDocumentChangeEvent) {
        if (!this.hasDocument()) {
            this.document = e.document;
        } else if (!this.belongsToDocument(e.document)) {
            throw "Tried to batch text changes to a mismatched document.";
        }

        this.changeEvents.push(e);
    }
}
