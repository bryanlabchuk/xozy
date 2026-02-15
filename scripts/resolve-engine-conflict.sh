#!/usr/bin/env bash
# Removes merge conflict markers from src/engine.js, keeping your branch's code
# (PolySynth play/stop + DrumMachine). Run from repo root.
set -e
FILE="src/engine.js"
if ! grep -q '<<<<<<<' "$FILE" 2>/dev/null; then
  echo "No conflict markers found in $FILE - nothing to do."
  exit 0
fi
# Remove the three conflict marker lines; keep everything else
sed -i.bak '/^<<<<<<< /d; /^=======$/d; /^>>>>>>> /d' "$FILE"
rm -f "$FILE.bak"
echo "Removed conflict markers from $FILE. Please review and then: git add $FILE && git commit -m 'Resolve merge conflict' && git push"
exit 0
