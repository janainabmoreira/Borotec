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

echo "Resposta da API: $RESPONSE" | head -c 300

if echo "$RESPONSE" | grep -q '"full_name"'; then
  echo ""
  echo "Repositório criado com sucesso!"
else
  echo ""
  echo "Erro ao criar repositório. Verificando se já existe..."
fi

echo ""
echo "Configurando remote e fazando push..."
cd /e/PROJETOS/Borotec_oficial
git remote remove origin 2>/dev/null
git remote add origin https://$TOKEN@github.com/$USERNAME/$REPO.git
git push -u origin main

echo ""
echo "Concluído!"
