#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, outro, text, spinner, cancel, isCancel } from '@clack/prompts';
import pc from 'picocolors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Вспомогательная пауза
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Перемещение курсора вверх на N строк для перезаписи кадров
function clearLines(count) {
  process.stdout.write(`\x1b[${count}A\x1b[0J`);
}

// Строки ASCII-баннера Weegoos
const BANNER_LINES = [
  '  __        _____ _____ ____   ___   ___  ____  ',
  '  \\ \\      / / ____| ____/ ___| / _ \\ / _ \\/ ___| ',
  '   \\ \\ /\\ / /|  _| |  _|| |  _ | | | | | | \\___ \\ ',
  '    \\ V  V / | |___| |__| |_| || |_| | |_| |___) |',
  '     \\_/\\_/  |_____|_____\\____/ \\___/ \\___/|____/ '
];

// Усовершенствованная анимация печати баннера
async function animateTypingBanner() {
  const lineCount = BANNER_LINES.length;
  const maxLength = Math.max(...BANNER_LINES.map((l) => l.length));

  // 1. Поколоночная печать с эффектом подсвеченного переднего края (Glow Edge)
  for (let col = 1; col <= maxLength; col++) {
    for (let i = 0; i < lineCount; i++) {
      const typedPart = BANNER_LINES[i].slice(0, col);
      const body = typedPart.slice(0, -1);
      const headChar = typedPart.slice(-1);

      // Тело логотипа в циане, головной символ подсвечен белым, курсор зеленым
      const cursor = col < maxLength ? pc.bold(pc.green('▌')) : '';
      const lineOutput = pc.bold(pc.cyan(body)) + pc.bold(pc.white(headChar)) + cursor;

      console.log(lineOutput);
    }

    await sleep(12); // Оптимальная скорость каретки

    if (col < maxLength) {
      clearLines(lineCount);
    }
  }

  // 2. Эффект неонового пульса (Зеленый -> Белая вспышка -> Итоговый циан)
  const pulseColors = [pc.green, pc.white, pc.cyan];
  for (const colorFn of pulseColors) {
    await sleep(65);
    clearLines(lineCount);
    for (const line of BANNER_LINES) {
      console.log(pc.bold(colorFn(line)));
    }
  }
}

// Анимация посимвольной печати подзаголовка
async function animateSubtitle(textStr) {
  const length = textStr.length;

  for (let i = 1; i <= length; i++) {
    const typed = textStr.slice(0, i);
    const cursor = i < length ? pc.green('▌') : '';
    console.log('   ' + pc.dim(typed) + cursor);

    await sleep(14);

    if (i < length) {
      clearLines(1);
    }
  }
  console.log(''); // Пустая строка перед intro
}

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
  console.clear();

  // 1. Анимируем логотип WEEGOOS
  await animateTypingBanner();

  // 2. Анимируем подзаголовок
  await sleep(100);
  await animateSubtitle('⚡ High-performance Vue 3 & GSAP Framework CLI');

  intro(pc.bgCyan(pc.black(' create-weegoos ')));

  // 1. Запрос названия проекта
  const projectName = await text({
    message: 'Как назовем твой новый проект?',
    placeholder: 'weegoos-app',
    defaultValue: 'weegoos-app',
    validate(value) {
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