# LSPDock

VS Code extension that connects your editor to LSP servers running inside Docker containers.

## What it does

Your code lives locally, but your language server (pyright, typescript-language-server, gopls, etc.) runs inside a Docker container. LSPDock bridges the gap, translating paths between your local filesystem and the container.

## Installation

Install from the VS Code marketplace or:

```bash
code --install-extension lspdock-0.1.0.vsix
```

## Configuration

Open VS Code settings (`Cmd+,` or `Ctrl+,`) and search for "lspdock".

### Required Settings

| Setting | Description |
|---------|-------------|
| `lspdock.container` | Docker container name or ID |
| `lspdock.dockerPath` | Path inside the container (e.g., `/app`) |
| `lspdock.localPath` | Your local project path (e.g., `/Users/you/project`) |
| `lspdock.executable` | LSP server command (e.g., `pyright-langserver`) |

### Optional Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `lspdock.enable` | `true` | Enable/disable the extension |
| `lspdock.language` | `python` | Language to activate for |
| `lspdock.configurationSections` | `["python", "pyright"]` | Config sections to sync |
| `lspdock.pattern` | | Path pattern to determine Docker usage |
| `lspdock.logLevel` | | `trace`, `debug`, `info`, `warning`, `error` |
| `lspdock.extraArgs` | `[]` | Additional args passed to the LSP |
| `lspdock.binaryPath` | | Custom path to lspdock binary |

### Example: Python with Pyright

```json
{
  "lspdock.container": "myapp-web-1",
  "lspdock.dockerPath": "/app",
  "lspdock.localPath": "/Users/you/myapp",
  "lspdock.executable": "pyright-langserver",
  "lspdock.language": "python",
  "lspdock.configurationSections": ["python", "pyright"]
}
```

### Example: TypeScript

```json
{
  "lspdock.container": "myapp-node-1",
  "lspdock.dockerPath": "/app",
  "lspdock.localPath": "/Users/you/myapp",
  "lspdock.executable": "typescript-language-server",
  "lspdock.extraArgs": ["--stdio"],
  "lspdock.language": "typescript",
  "lspdock.configurationSections": ["typescript"]
}
```

### Example: Go

```json
{
  "lspdock.container": "myapp-go-1",
  "lspdock.dockerPath": "/app",
  "lspdock.localPath": "/Users/you/myapp",
  "lspdock.executable": "gopls",
  "lspdock.language": "go",
  "lspdock.configurationSections": ["go", "gopls"]
}
```

## Troubleshooting

1. Open the Output panel: `View` → `Output`
2. Select `LSPDock Proxy` from the dropdown
3. Set `lspdock.logLevel` to `debug` or `trace` for more details

## Links

- [lspdock](https://github.com/richardhapb/lspdock) - The underlying proxy binary
