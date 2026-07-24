#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, outro, text, spinner, cancel, isCancel } from '@clack/prompts';
import pc from 'picocolors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Стильный ASCII-баннер для Weegoos
const BANNER = pc.bold(pc.cyan(`
  __        _____ _____ ____   ___   ___  ____  
  \\ \\      / / ____| ____/ ___| / _ \\ / _ \\/ ___| 
   \\ \\ /\\ / /|  _| |  _|| |  _ | | | | | | \\___ \\ 
    \\ V  V / | |___| |__| |_| || |_| | |_| |___) |
     \\_/\\_/  |_____|_____\____/ \\___/ \\___/|____/ 
`));

// Рекурсивное копирование файлов шаблона
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

async function main() {
  // Очищаем консоль и выводим фирменный баннер
  console.clear();
  console.log(BANNER);
  console.log(pc.dim('  ⚡ High-performance Vue 3 & GSAP Framework CLI\n'));

  intro(pc.bgCyan(pc.black(' create-weegoos ')));

  // 1. Запрос названия проекта
  const projectName = await text({
    message: 'Как назовем твой новый проект?',
    placeholder: 'weegoos-app',
    defaultValue: 'weegoos-app',
    validate(value) {
      // Безопасная проверка: обрабатываем случай, когда value ещё undefined или пустая строка
      if (value !== undefined && !value.trim()) {
        return 'Название не может быть пустым';
      }
    },
  });

  // Корректный выход при нажатии Ctrl + C
  if (isCancel(projectName)) {
    cancel('Создание проекта отменено.');
    process.exit(0);
  }

  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    cancel(`Папка "${projectName}" уже существует в текущей директории!`);
    process.exit(1);
  }

  // 2. Интерактивный спиннер копирования
  const s = spinner();
  s.start('Разворачиваем стартовый шаблон Weegoos...');

  const templateDir = path.resolve(__dirname, '../template');

  try {
    // Копируем файлы шаблона
    copyDir(templateDir, targetDir);

    // Подменяем name в package.json создаваемого проекта
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      pkg.name = projectName;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }

    s.stop('Шаблон успешно развернут!');

    outro(
      pc.green('🎉 Проект успешно создан!') + '\n\n' +
      pc.bold('Запусти следующие команды для старта:\n\n') +
      `  ${pc.cyan(`cd ${projectName}`)}\n` +
      `  ${pc.cyan('pnpm install')} ${pc.dim('(или npm install)')}\n` +
      `  ${pc.cyan('pnpm dev')}     ${pc.dim('(или npm run dev)')}\n`
    );
  } catch (err) {
    s.stop('Произошла ошибка при копировании файлов.');
    console.error(err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});