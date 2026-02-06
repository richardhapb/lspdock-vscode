import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

function getBinaryPath(context: vscode.ExtensionContext): string {
  const config = vscode.workspace.getConfiguration('lspdock');
  const configuredPath = config.get<string>('binaryPath', '');

  if (configuredPath) {
    return configuredPath;
  }

  // Use bundled binary based on platform
  const platform = process.platform;
  const arch = process.arch;

  let binaryName = 'lspdock';
  if (platform === 'win32') {
    binaryName = 'lspdock.exe';
  }

  // Try platform-specific directory first
  const platformDir = `${platform}-${arch}`;
  const platformBinary = path.join(context.extensionPath, 'bin', platformDir, binaryName);
  if (fs.existsSync(platformBinary)) {
    return platformBinary;
  }

  // Fallback to generic bin directory
  const genericBinary = path.join(context.extensionPath, 'bin', binaryName);
  if (fs.existsSync(genericBinary)) {
    return genericBinary;
  }

  // Fallback to system PATH
  return 'lspdock';
}

function buildArgs(): string[] {
  const config = vscode.workspace.getConfiguration('lspdock');
  const args: string[] = [];

  const container = config.get<string>('container', '');
  if (container) {
    args.push('--container', container);
  }

  const dockerPath = config.get<string>('dockerPath', '');
  if (dockerPath) {
    args.push('--docker-path', dockerPath);
  }

  const localPath = config.get<string>('localPath', '');
  if (localPath) {
    args.push('--local-path', localPath);
  }

  const executable = config.get<string>('executable', '');
  if (executable) {
    args.push('--exec', executable);
  }

  const pids = config.get<string>('pids', '');
  if (pids) {
    args.push('--pids', pids);
  }

  const pattern = config.get<string>('pattern', '');
  if (pattern) {
    args.push('--pattern', pattern);
  }

  const logLevel = config.get<string>('logLevel', '');
  if (logLevel) {
    args.push('--log-level', logLevel);
  }

  // Extra args go after -- separator
  const extraArgs = config.get<string[]>('extraArgs', []);
  if (extraArgs.length > 0) {
    args.push('--');
    args.push(...extraArgs);
  }

  return args;
}

export async function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('lspdock');

  if (!config.get<boolean>('enable', true)) {
    return;
  }

  const binaryPath = getBinaryPath(context);
  const args = buildArgs();

  const serverOptions: ServerOptions = {
    command: binaryPath,
    args: args,
  };

  const language = config.get<string>('language', 'python');
  const configSections = config.get<string[]>('configurationSections', ['python', 'pyright']);

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: language }],
    synchronize: {
      configurationSection: configSections,
    },
  };

  client = new LanguageClient('lspdock', 'LSPDock Proxy', serverOptions, clientOptions);

  context.subscriptions.push(client);

  await client.start();
}

export function deactivate(): Promise<void> | undefined {
  return client?.stop();
}