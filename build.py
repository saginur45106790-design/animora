"""Build Animora for Render Static Sites. Python standard library only."""
from pathlib import Path
import json
import shutil
import zipfile

ROOT = Path(__file__).resolve().parent
DIST = ROOT / 'dist'
DIST.mkdir(exist_ok=True)
(DIST / 'vendor').mkdir(exist_ok=True)
for name in ['index.html', 'app.js', 'style.css', 'software-renderer.js', 'credits.html', 'catalog.json']:
    shutil.copy2(ROOT / name, DIST / name)
for name in ['three.module.js', 'GLTFLoader.js', 'BufferGeometryUtils.js', 'OrbitControls.js']:
    shutil.copy2(ROOT / name, DIST / 'vendor' / name)
shutil.copy2(ROOT / 'THREE-LICENSE.txt', DIST / 'vendor' / 'LICENSE')
for name in ['assets-1.zip', 'assets-2.zip']:
    archive = ROOT / name
    if not archive.exists():
        raise SystemExit(f'Missing {name}. Upload BOTH asset ZIP files to the GitHub repository root.')
    with zipfile.ZipFile(archive) as z:
        for item in z.infolist():
            target = (DIST / item.filename).resolve()
            if not target.is_relative_to(DIST.resolve()) or not item.filename.startswith('packs/'):
                raise SystemExit('Unsafe archive path: ' + item.filename)
        z.extractall(DIST)
models = [m for p in json.loads((DIST / 'catalog.json').read_text())['packs'] for m in p['models']]
for model in models:
    for field in ['file', 'thumb']:
        if not (DIST / model[field]).is_file():
            raise SystemExit('Missing asset: ' + model[field])
print(f'Build successful: {len(models)} models plus thumbnails. Publish directory: dist')
