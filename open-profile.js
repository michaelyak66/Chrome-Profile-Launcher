const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Get your Windows username
const username = process.env.USERNAME;
const chromeUserDataDir = `C:/Users/${username}/AppData/Local/Google/Chrome/User Data`;
const chromeExePath = `"C:/Program Files/Google/Chrome/Application/chrome.exe"`;

// Load all profile directories
const profileDirs = fs.readdirSync(chromeUserDataDir).filter(dir =>
  dir.startsWith('Profile') || dir === 'Default'
);

// Load profile metadata from 'Local State'
const localStatePath = path.join(chromeUserDataDir, 'Local State');
console.log(" localStatePath: ", localStatePath);
let profileNames = {};

if (fs.existsSync(localStatePath)) {
  const localState = JSON.parse(fs.readFileSync(localStatePath, 'utf8'));
  const profiles = localState?.profile?.info_cache || {};
  profileNames = Object.keys(profiles).reduce((acc, key) => {
    // console.log("key: ", key, "profiles[key]: ", profiles[key]);
    // ...existing code...
    const displayName = profiles[key].user_name.toLowerCase().replace(/@gmail\.com$/, '');
    // ...existing code...    acc[displayName] = key; // e.g., 'john doe': 'Profile 2'
    acc[displayName] = key; // e.g., 'john doe': 'Profile 2'

    return acc;
  }, {});
}

console.log(profileNames);

// Get user input
const search = process.argv[2];
if (!search) {
  console.log('❌ Usage: node open-profile.js <name | email | number>');
  process.exit(1);
}

const normalizedSearch = search.toLowerCase();

// 1️⃣ Match by profile display name
let profileDir = profileNames[normalizedSearch];

// 2️⃣ Match by profile number (e.g., 295 → Profile 295)
if (!profileDir && !isNaN(Number(search))) {
  const candidate = `Profile ${search}`;
  if (profileDirs.includes(candidate)) {
    profileDir = candidate;
  }
}

// 3️⃣ Fallback to matching profile folder name directly
if (!profileDir && profileDirs.includes(search)) {
  profileDir = search;
}

if (!profileDir) {
  console.log(`❌ No matching Chrome profile found for "${search}"`);
  process.exit(1);
}

// 🚀 Launch Chrome with the matched profile
const cmd = `${chromeExePath} --profile-directory="${profileDir}"`;
console.log(`✅ Launching: ${profileDir}`);
exec(cmd);
