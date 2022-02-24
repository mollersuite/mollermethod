curl -L https://github.com/rojo-rbx/rojo/releases/download/v7.0.0/rojo-7.0.0-linux.zip | zcat >> rojo
npx rbxtsc --type model
./rojo build default.project.json -o static/mollermethod.rbxm
