#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import { green, cyan, red } from 'kolorist';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function init() {
  console.log(`\n⚡️ ${green('Добро пожаловать в Weegoos Framework CLI!')}\n`);

  // 1. Спрашиваем имя проекта
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Как назовем твой новый проект?',
      initial: 'weegoos-app'
    }
  ]);

  const { projectName } = response;
  if (!projectName) return;

  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.log(red(`❌ Папка ${projectName} уже существует!`));
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });

  // 2. Путь к нашему шаблону внутри CLI пакета
  const templateDir = path.resolve(__dirname, '../template');

  // Функция для рекурсивного копирования файлов
  const copy = (src, dest) => {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      for (const file of fs.readdirSync(src)) {
        copy(path.join(src, file), path.join(dest, file));
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  console.log(cyan(`\n📦 Создаем проект в ${targetDir}...`));
  copy(templateDir, targetDir);

  console.log(`\n🎉 ${green('Успешно! Ваш Weegoos проект инициализирован.')}`);
  console.log(`\nЗапустите следующие команды для старта:`);
  console.log(cyan(`  cd ${projectName}`));
  console.log(cyan(`  npm install`));
  console.log(cyan(`  npm run dev\n`));
}

init().catch((err) => console.error(err));