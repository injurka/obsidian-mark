import fs from 'fs/promises'; // Используем промисы из fs
import path from 'path';
import { Dirent } from 'fs'; // Импортируем тип Dirent для readdir

// --- Типы данных ---
enum ContentNavItemType {
    File = 'file',
    Directory = 'directory',
}

interface ContentNavItem {
    sysname: string;
    title: string;
    type: ContentNavItemType;
    children?: ContentNavItem[]; // Дети могут быть только у директорий
}

// --- Константы ---
const NAV_FILENAME: string = 'nav.json';
const IMAGE_DEST_FOLDER: string = '_'; // Папка для изображений в корне назначения

// --- Регулярные выражения ---
const FRONT_MATTER_REGEX: RegExp = /^---\s*([\s\S]*?)\s*---/;
const SYSNAME_REGEX: RegExp = /^\s*sysname:\s*"?([^"\s]+)"?\s*$/m;

// --- Расширения изображений (можно дополнить) ---
const IMAGE_EXTENSIONS: Set<string> = new Set([
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.tiff'
]);

/**
 * Проверяет, является ли расширение файла расширением изображения.
 * @param extension - Расширение файла (например, '.png').
 * @returns true, если это изображение, иначе false.
 */
function isImageExtension(extension: string): boolean {
    return IMAGE_EXTENSIONS.has(extension.toLowerCase());
}

/**
 * Извлекает sysname из YAML front matter файла.
 * @param filePath - Путь к файлу.
 * @returns Промис, который разрешается значением sysname или null, если его нет.
 */
async function extractSysnameFromFrontMatter(filePath: string): Promise<string | null> {
    let fileHandle: fs.FileHandle | undefined;
    try {
        // Читаем только начало файла, чтобы не загружать большие файлы целиком
        fileHandle = await fs.open(filePath, 'r');
        const buffer = Buffer.alloc(1024); // Читаем первый килобайт
        const { bytesRead } = await fileHandle.read(buffer, 0, 1024, 0);

        if (bytesRead === 0) {
            return null;
        }

        const contentStart: string = buffer.toString('utf8', 0, bytesRead);
        const frontMatterMatch = contentStart.match(FRONT_MATTER_REGEX);

        if (frontMatterMatch?.[1]) { // Используем optional chaining
            const yamlContent = frontMatterMatch[1];
            const sysnameMatch = yamlContent.match(SYSNAME_REGEX);
            if (sysnameMatch?.[1]) { // Используем optional chaining
                return sysnameMatch[1]; // Возвращаем найденное значение sysname
            }
        }
    } catch (error: any) { // Явно указываем тип ошибки (можно использовать unknown и проверять)
        // Игнорируем ошибки чтения файла (например, нет прав), front matter не будет извлечен
        console.warn(`Не удалось прочитать front matter из файла ${filePath}: ${error.message}`);
    } finally {
        // Гарантированно закрываем файл, если он был открыт
        await fileHandle?.close();
    }
    return null; // Front matter или sysname не найдены
}


/**
 * Рекурсивно сканирует директорию, строит дерево JSON и копирует/перемещает файлы/папки.
 * @param sourceCurrentPath - Текущий путь сканирования в исходной директории.
 * @param destBasePath - Базовый путь для экспорта (корень папки назначения).
 * @param relativePath - Относительный путь от корня исходной директории (используется для построения пути назначения).
 * @param imageDestPath - Абсолютный путь к папке для изображений (`destBasePath` + `IMAGE_DEST_FOLDER`).
 * @returns Промис, разрешающийся массивом ContentNavItem для текущего уровня.
 */
async function processDirectoryRecursive(
    sourceCurrentPath: string,
    destBasePath: string,
    relativePath: string,
    imageDestPath: string // Передаем путь к папке с изображениями
): Promise<ContentNavItem[]> {
    const childrenNavItems: ContentNavItem[] = [];
    try {
        const entries: Dirent[] = await fs.readdir(sourceCurrentPath, { withFileTypes: true });

        for (const entry of entries) {
            const entryName = entry.name;
            const sourceFullPath = path.join(sourceCurrentPath, entryName);
            const extension = path.extname(entryName);

            // --- Правила игнорирования ---
            if (entryName.startsWith('.')) continue; // Скрытые файлы/папки
            if (entry.isDirectory() && entryName === '-') continue; // Папка '-' (если это специальное правило)

            // --- Обработка изображений ---
            if (entry.isFile() && isImageExtension(extension)) {
                const targetImagePath = path.join(imageDestPath, entryName);
                try {
                    await fs.copyFile(sourceFullPath, targetImagePath);
                    console.log(`🖼️ Изображение скопировано: ${entryName} -> ${IMAGE_DEST_FOLDER}/`);
                } catch (copyError: any) {
                    console.error(`Ошибка копирования изображения ${entryName}:`, copyError.message);
                }
                continue; // Переходим к следующему элементу, не добавляем в nav.json
            }

            // --- Определение типа и базовых имен ---
            const type = entry.isDirectory() ? ContentNavItemType.Directory : ContentNavItemType.File;
            // Title - имя файла без расширения
            const title = path.basename(entryName, extension);

            let sysname = entryName; // По умолчанию sysname = имя файла/папки
            let targetName = entryName; // Имя файла/папки в директории назначения по умолчанию
            let currentChildren: ContentNavItem[] | undefined = undefined;

            // --- Обработка файлов (извлечение sysname, определение targetName) ---
            if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
                const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath);
                if (frontMatterSysname) {
                    sysname = frontMatterSysname; // Используем sysname из front matter
                    targetName = `${sysname}${extension}`; // Новое имя файла = sysname + .md
                } else {
                    // Если front matter нет, sysname становится именем файла без расширения
                    sysname = title;
                    // targetName остается оригинальным entryName
                }
            } else if (type === ContentNavItemType.File) {
                // Для других файлов (не .md и не изображений) используем имя без расширения как sysname
                sysname = title;
                // targetName остается оригинальным entryName
            }
            // Для директорий sysname и targetName остаются оригинальным именем папки

            // --- Определение пути назначения для НЕ-изображений ---
            const destRelativePath = path.join(relativePath, targetName);
            const destFullPath = path.join(destBasePath, destRelativePath);

            // --- Создание/Копирование ---
            if (type === ContentNavItemType.Directory) {
                // Создаем папку назначения
                await fs.mkdir(destFullPath, { recursive: true });
                // Рекурсивно обрабатываем вложенную папку
                currentChildren = await processDirectoryRecursive(
                    sourceFullPath,
                    destBasePath,
                    destRelativePath, // Передаем обновленный относительный путь
                    imageDestPath     // Пробрасываем путь к папке изображений
                );
            } else {
                // Копируем файл (не изображение и не .md без frontmatter с тем же именем)
                await fs.copyFile(sourceFullPath, destFullPath);
            }

            // --- Создание объекта для nav.json ---
            const navItem: ContentNavItem = {
                sysname: sysname,
                title: title,
                type: type,
            };
            if (currentChildren && currentChildren.length > 0) { // Добавляем children только если они не пустые
                navItem.children = currentChildren;
            }

            childrenNavItems.push(navItem);
        }

    } catch (error: any) {
        console.error(`Ошибка обработки директории ${sourceCurrentPath}:`, error.message);
    }

    // Сортировка: папки -> файлы, по алфавиту title
    childrenNavItems.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === ContentNavItemType.Directory ? -1 : 1;
        }
        // Используем localeCompare для корректной сортировки строк
        return a.title.localeCompare(b.title);
    });

    return childrenNavItems;
}

// --- Основная функция ---
export async function main(_sourceDir?: string, _exportDir?: string): Promise<void> {
    // process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
    const sourceDir: string | undefined = _sourceDir ?? process.argv[2];
    const exportDir: string | undefined = _exportDir ?? process.argv[3];

    if (!sourceDir || !exportDir) {
        console.error('Ошибка: Необходимо указать два аргумента:');
        console.error('1. Путь к исходной директории');
        console.error('2. Путь к директории для экспорта');
        console.error('Пример: node dist/script.js /path/to/source /path/to/export');
        process.exit(1);
    }

    // Преобразуем пути в абсолютные для надежности
    const absoluteSourceDir = path.resolve(sourceDir);
    const absoluteExportDir = path.resolve(exportDir);
    const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER);

    // Очистка и создание директории назначения
    console.log(`Очистка и подготовка директории назначения: ${absoluteExportDir}`);
    await fs.rm(absoluteExportDir, { recursive: true, force: true }); // Удаляем, если существует
    await fs.mkdir(absoluteExportDir, { recursive: true }); // Создаем заново
    await fs.mkdir(absoluteImageDestPath, { recursive: true }); // Создаем папку для изображений '_'

    try {
        // Проверка исходной директории
        try {
            const sourceStats = await fs.stat(absoluteSourceDir);
            if (!sourceStats.isDirectory()) {
                throw new Error(`Исходный путь "${absoluteSourceDir}" не является директорией.`);
            }
        } catch (statError: any) {
            if (statError.code === 'ENOENT') {
                throw new Error(`Исходная директория "${absoluteSourceDir}" не найдена.`);
            }
            throw statError; // Перебрасываем другие ошибки stat
        }

        console.log(`Начинаю обработку директории: ${absoluteSourceDir}`);
        console.log(`Экспорт в: ${absoluteExportDir}`);
        console.log(`Изображения будут скопированы в: ${absoluteImageDestPath}`);

        // Запускаем рекурсивную обработку и построение JSON
        const navigationStructure: ContentNavItem[] = await processDirectoryRecursive(
            absoluteSourceDir,
            absoluteExportDir,
            '', // Начинаем с пустого относительного пути
            absoluteImageDestPath
        );

        // Запись файла nav.json
        const navFilePath = path.join(absoluteExportDir, NAV_FILENAME);
        await fs.writeFile(navFilePath, JSON.stringify(navigationStructure, null, 2));

        console.log(`\nОбработка завершена.`);
        console.log(`Структура файлов скопирована в ${absoluteExportDir}`);
        console.log(`Изображения помещены в ${absoluteImageDestPath}`);
        console.log(`Файл навигации сохранен: ${navFilePath}`);

    } catch (error: any) {
        // Ловим ошибки, которые могли возникнуть до основного блока try/catch в main
        if (error instanceof Error) { // Проверяем, что это действительно объект Error
            console.error('Произошла ошибка во время выполнения:', error.message);
            // Можно добавить вывод стека для отладки: console.error(error.stack);
        } else {
            console.error('Произошла неизвестная ошибка:', error);
        }
        process.exit(1);
    }
}

export async function clean(_sourceDir?: string, _exportDir?: string): Promise<void> {
    // process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
    const exportDir: string | undefined = _exportDir ?? process.argv[3];

    // Преобразуем пути в абсолютные для надежности
    const absoluteExportDir = path.resolve(exportDir);
    const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER);

    // Очистка и создание директории назначения
    console.log(`Очистка и подготовка директории назначения: ${absoluteExportDir}`);
    await fs.rm(absoluteExportDir, { recursive: true, force: true }); // Удаляем, если существует
    await fs.mkdir(absoluteExportDir, { recursive: true }); // Создаем заново
    await fs.mkdir(absoluteImageDestPath, { recursive: true }); // Создаем папку для изображений '_'
}
