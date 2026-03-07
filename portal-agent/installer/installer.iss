#define MyAppName "Portal Agent"
#define MyAppVersion "1.0.0"
#define MyExeName "agent.exe"

[Setup]
AppName={#MyAppName}
AppVersion={#MyAppVersion}
PrivilegesRequired=lowest
DefaultDirName={localappdata}\PortalAgent
DefaultGroupName={#MyAppName}
OutputDir=output
OutputBaseFilename=portal-agent-installer
Compression=lzma
SolidCompression=yes

[Files]
Source: "..\dist\agent\agent.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Portal Agent"; Filename: "{app}\agent.exe"
Name: "{group}\Desinstalar Portal Agent"; Filename: "{uninstallexe}"

[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; \
ValueType: string; ValueName: "PortalAgent"; \
ValueData: """{app}\agent.exe"""

[Run]
Filename: "{app}\agent.exe"; Flags: nowait postinstall skipifsilent
