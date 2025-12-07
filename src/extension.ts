import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export async function activate(context: vscode.ExtensionContext) {
    const serverOptions: ServerOptions = {
        command: 'lspdock',
        args: ['--stdio'],
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'python' }],
        synchronize: {
            configurationSection: ['python', 'pyright'],
        },
    };

    client = new LanguageClient('lspdock', 'LSPDock Proxy', serverOptions, clientOptions);

    // This is key - register for cleanup
    context.subscriptions.push(client);


    await client.start();
}

export function deactivate(): Promise<void> | undefined {
    return client?.stop();
}