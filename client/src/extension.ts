/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { workspace, ExtensionContext } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(_: ExtensionContext) {
  // The server is implemented in node
  const serverPath =
    workspace.getConfiguration("koreo-ls").get<string>("serverPath") ||
    "koreo-ls";

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  //   const serverOptions: ServerOptions = {
  //     run: { command: serverPath, transport: TransportKind.stdio } as Executable,
  //   };

  // Options to control the language client
  // const clientOptions: LanguageClientOptions = {
  //   // Register the server for plain text documents
  //   documentSelector: [{ scheme: "file", language: "koreo" }],
  // };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "koreo" }],
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "koreols",
    "Koreo Language Server",
    { command: serverPath, transport: TransportKind.stdio },
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
