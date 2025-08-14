# Chrome Profile Launcher

A simple Node.js utility to quickly launch Google Chrome with specific user profiles on Windows.

## Overview

This tool allows you to launch Chrome with a specific profile by providing either:
- The first part of the email address. For example: "johndoe@gmail.com" you would only use the "johndoe" part
- The profile's display name (e.g., "john doe")
- A profile number (e.g., "295" for Profile 295)
- The exact profile directory name (e.g., "Profile 295" or "Default")

## Prerequisites

- **Windows OS** (this tool is Windows-specific)
- **Node.js** installed on your system
- **Google Chrome** installed in the default location: `C:/Program Files/Google/Chrome/Application/chrome.exe`

## Installation

1. Clone or download this repository
2. No additional npm packages required - uses only Node.js built-in modules

## Usage

### Method 1: Direct Node.js Command

```bash
node open-profile.js <name|email|number>
```

**Examples:**
```bash
# Launch by display name
node open-profile.js "john doe"

# Launch by profile number
node open-profile.js 295

# Launch by profile directory name
node open-profile.js "Profile 295"

# Launch default profile
node open-profile.js Default
```

### Method 2: Interactive Batch Script

Double-click `launch.bat` or run it from command line for an interactive session:

```cmd
launch.bat
```

This will prompt you repeatedly for profile names until you press Enter without input.

## How It Works

The application:

1. **Discovers Profiles**: Scans `C:/Users/{username}/AppData/Local/Google/Chrome/User Data` for profile directories
2. **Loads Profile Metadata**: Reads Chrome's `Local State` file to map display names to profile directories
3. **Matches Input**: Uses a flexible matching system:
   - First tries to match by display name (extracted from Gmail addresses)
   - Then tries to match by profile number
   - Finally tries exact profile directory name matching
4. **Launches Chrome**: Executes Chrome with the `--profile-directory` flag

## File Structure

```
chrome-profile/
├── open-profile.js    # Main Node.js script
├── launch.bat         # Interactive Windows batch file
├── package.json       # Node.js package configuration
└── README.md          # This documentation
```

## Profile Matching Logic

The tool uses intelligent matching to find profiles:

1. **Display Name Matching**: 
   - Extracts Gmail usernames from Chrome's Local State
   - Converts to lowercase for case-insensitive matching
   - Example: "john.doe@gmail.com" becomes "john.doe"

2. **Profile Number Matching**:
   - Input like "295" matches "Profile 295"
   - Validates the profile directory actually exists

3. **Direct Directory Matching**:
   - Exact match against profile folder names
   - Supports "Default" and "Profile X" formats

## Error Handling

The application provides clear error messages:

- **Missing argument**: Shows usage instructions
- **Profile not found**: Lists the search term that couldn't be matched
- **Chrome not found**: Would fail silently (Chrome handles missing executable)

## Limitations

- **Windows Only**: Hardcoded paths specific to Windows Chrome installation
- **Default Chrome Path**: Assumes Chrome is installed in the standard Program Files location
- **Gmail Accounts**: Profile name extraction is optimized for Gmail addresses

## Troubleshooting

### Profile Not Found
- Ensure Chrome has been opened with the profile at least once
- Check that the profile exists in Chrome's settings
- Try using the exact profile directory name (e.g., "Profile 1")

### Chrome Won't Launch
- Verify Chrome is installed at: `C:/Program Files/Google/Chrome/Application/chrome.exe`
- Check that the profile directory exists in: `C:/Users/{username}/AppData/Local/Google/Chrome/User Data`

### Permission Issues
- Ensure the script has read access to Chrome's User Data directory
- Run command prompt as administrator if needed

## Advanced Usage

### Finding Available Profiles

You can manually check what profiles exist by looking in:
```
C:/Users/{your-username}/AppData/Local/Google/Chrome/User Data
```

### Customizing Chrome Launch Options

Edit [`open-profile.js`](file:///c:/Users/mikem/OneDrive/Documents/STACKS%20AUTOMATION/CHROME%20PROFILE/open-profile.js#L67) to add additional Chrome flags:

```javascript
const cmd = `${chromeExePath} --profile-directory="${profileDir}" --new-window --incognito`;
```

## Development

The project structure is simple:
- [`open-profile.js`](file:///c:/Users/mikem/OneDrive/Documents/STACKS%20AUTOMATION/CHROME%20PROFILE/open-profile.js): Main application logic
- [`launch.bat`](file:///c:/Users/mikem/OneDrive/Documents/STACKS%20AUTOMATION/CHROME%20PROFILE/launch.bat): Windows batch wrapper for interactive use
- [`package.json`](file:///c:/Users/mikem/OneDrive/Documents/STACKS%20AUTOMATION/CHROME%20PROFILE/package.json): Node.js project configuration

No external dependencies are required - the application uses only Node.js built-in modules (`fs`, `path`, `child_process`).

## License

ISC License - Feel free to modify and distribute as needed.
