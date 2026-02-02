#define MyAppName "Portal Agent"
#define MyAppVersion "1.0.0"
#define MyExeName "agent.exe"

[Setup]
AppName={#MyAppName}
AppVersion={#MyAppVersion}
DefaultDirName={pf}\PortalAgent
DefaultGroupName={#MyAppName}
OutputDir=output
OutputBaseFilename=portal-agent-installer
Compression=lzma
SolidCompression=yes

[Files]
Source: "..\dist\agent.exe"; DestDir: "{app}"; Flags: ignoreversion

[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; \
ValueType: string; ValueName: "PortalAgent"; \
ValueData: """{app}\agent.exe"""

[Run]
Filename: "{app}\agent.exe"; Flags: nowait postinstall skipifsilent
