#!/usr/bin/env python3
"""Build and verify a clean Gelbox source checkout, then copy its static release."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
from datetime import datetime, timezone

if len(sys.argv) != 2:
    raise SystemExit('Usage: python3 scripts/update-gelbox-web.py /path/to/gel')
source = Path(sys.argv[1]).resolve()
site = Path(__file__).resolve().parents[1]
if not (source / 'ts/package.json').is_file():
    raise SystemExit('Expected the Gelbox web source repository (containing ts/package.json).')
def git(*args):
    return subprocess.check_output(['git', '-C', str(source), *args], text=True).strip()
if git('status', '--porcelain'):
    raise SystemExit('Commit source changes before packaging so the release identifies exact source.')
for script in ['test:unit', 'test:production']:
    subprocess.run(['npm', '--prefix', str(source / 'ts'), 'run', script], check=True, cwd=source)
release = site / 'gelbox/app'
if release.exists():
    if not (release / 'release.json').is_file():
        raise SystemExit('Refusing to replace an app directory without a release manifest.')
    shutil.rmtree(release)
shutil.copytree(source / 'ts/dist', release)
files = {str(p.relative_to(release)): hashlib.sha256(p.read_bytes()).hexdigest()
         for p in sorted(release.rglob('*')) if p.is_file()}
(release / 'release.json').write_text(json.dumps({
    'source_commit': git('rev-parse', 'HEAD'),
    'built_at': datetime.now(timezone.utc).isoformat(),
    'path': '/gelbox/app/',
    'checks': ['npm run test:unit', 'npm run test:production'],
    'sha256': files,
}, indent=2) + '\n')
print(f'Verified build copied to {release}')
