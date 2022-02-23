curl -o rojo.zip https://github.com/rojo-rbx/rojo/releases/download/v7.0.0/rojo-7.0.0-linux.zip
unzip rojo.zip
npx rbxtsc --type model

./rojo/rojo build default.project.json -o src/mollermethod.rbxmx
