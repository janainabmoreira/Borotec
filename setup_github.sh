#!/bin/bash

TOKEN=$GITHUB_TOKEN
USERNAME="janainabmoreira"
REPO="Borotec"

echo "Criando repositório no GitHub..."
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Borotec","private":false,"description":"Projeto Borotec Oficial"}' \
  https://api.github.com/user/repos)

echo $RESPONSE | grep -o '"full_name":"[^"]*"'

echo ""
echo "Configurando git local..."
cd /e/PROJETOS/Borotec_oficial
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://$TOKEN@github.com/$USERNAME/$REPO.git
git push -u origin main

echo ""
echo "Pronto! Repositório configurado."
