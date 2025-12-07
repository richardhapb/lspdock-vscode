# LSPDock

VS Code extension that proxies LSP servers through [lspdock](https://github.com/richardhapb/lspdock), enabling language server support for code running inside Docker containers.

## Requirements

`lspdock` binary must be in your PATH.

### Unix/macOS

```bash
# Option 1: Move to a directory already in PATH
sudo mv lspdock /usr/local/bin/

# Option 2: Add its directory to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$PATH:/path/to/lspdock/directory"
```

### Windows

```powershell
# Option 1: Move to a directory in PATH
move lspdock.exe C:\Windows\System32\

# Option 2: Add to PATH via PowerShell (requires admin)
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\path\to\lspdock\directory", "User")
```

Restart your terminal after modifying PATH.

## Installation

```bash
code --install-extension lspdock-0.0.1.vsix
```

Or in VS Code: `Cmd+Shift+P` → "Install from VSIX..."

## Configuration

Create `lspdock.toml` in your project root (if it doesn't exist):

```toml
container = "myapp-web-1"
docker_internal_path = "/usr/src/app"
local_path = "/Users/you/projects/myapp"
executable = "pyright-langserver"
```

## Troubleshooting

Check the output panel: `View` → `Output` → select `LSPDock Proxy` from dropdown.
