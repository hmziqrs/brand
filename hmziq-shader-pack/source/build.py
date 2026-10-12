from pathlib import Path
import json,base64,re
root=Path(__file__).resolve().parent
asset=root/'assets'
fonts=''
for name,file in [('Onest','onest.woff2')]:
 data=base64.b64encode((asset/file).read_bytes()).decode()
 fonts+=f'@font-face{{font-family:"{name}";font-weight:100 900;font-style:normal;font-display:swap;src:url(data:font/woff2;base64,{data}) format("woff2");}}\n'
thumbs={}
for file in (root/'renders').glob('*-thumb.webp'):
 thumbs[file.stem.replace('-thumb','')]='data:image/webp;base64,'+base64.b64encode(file.read_bytes()).decode()
licenses={f.name:f.read_text() for f in asset.glob('onest-OFL.txt')}
replacements={
'__FONTS__':fonts,'__CSS__':(root/'style.css').read_text(),'__WGSL__':(root.parent/'materials.wgsl').read_text(),
'__PRESETS__':(root/'presets.js').read_text(),'__APP__':(root/'app.js').read_text(),
'__THUMBNAILS__':json.dumps(thumbs),'__DEFAULT_IMAGE__':thumbs.get('oxide-bloom','data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='),
'__LICENSES__':json.dumps(licenses)
}
html=(root/'index.html').read_text()
for k,v in replacements.items():html=html.replace(k,v)
assert not re.search('__([A-Z_]+)__',html)
(root.parent/'hmziq-shader-studio.html').write_text(html)
(root/'combined.js').write_text((root/'presets.js').read_text()+'\n'+(root/'app.js').read_text())
print('Built',len(html),'characters;',len(thumbs),'thumbnails')
