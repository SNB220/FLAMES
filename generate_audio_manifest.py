import json
from pathlib import Path

AUDIO_DIR = Path(__file__).parent / "Audio"
AUDIO_ROOT = Path(__file__).parent
AUDIO_EXTENSIONS = {".mp3", ".wav", ".ogg", ".m4a", ".aac", ".webm"}

tracks = {}
for folder in sorted(path for path in AUDIO_DIR.iterdir() if path.is_dir()):
    files = [
        path.relative_to(AUDIO_ROOT).as_posix()
        for path in sorted(folder.iterdir())
        if path.is_file() and path.suffix.lower() in AUDIO_EXTENSIONS
    ]
    tracks[folder.name] = files

manifest = "window.FLAMES_AUDIO_TRACKS = " + json.dumps(tracks, indent=4) + ";\n"
Path(__file__).with_name("audio-manifest.js").write_text(manifest, encoding="utf-8")
print("Updated audio-manifest.js")
