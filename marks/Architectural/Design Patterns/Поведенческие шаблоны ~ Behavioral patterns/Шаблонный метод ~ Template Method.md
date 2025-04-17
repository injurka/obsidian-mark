
Определяет общий алгоритм поведения подклассов, позволяя им переопределить отдельные шаги этого алгоритма без изменения его структуры.

### Когда использовать?

- Когда планируется, что в будущем подклассы должны будут переопределять различные этапы алгоритма без изменения его структуры

- Когда в классах, реализующим схожий алгоритм, происходит дублирование кода. Вынесение общего кода в шаблонный метод уменьшит его дублирование в подклассах.

---

"Шаблон" состоит из двух основных частей: абстрактного родительского класса и конкретного подкласса реализации. Обычно, структура алгоритма подкласса инкапсулируется в абстрактном родительском классе, который также включает в себя реализацию некоторых общедоступных методов и порядок их выполнения. Наследуя от этого абстрактного класса, подклассы получают готовую структуру алгоритма и могут переопределять родительские методы.

Реализуем анализатор `CSV` и `MD` с помощью паттерна "Шаблон".

Для того, чтобы лучше понять приведенный ниже код, взгляните на следующую диаграмму, описывающую взаимосвязи между классами:


![Alt text](Шаблонный%20метод%20~%20Template%20Method.png)

Итак, паттерн "Шаблон" хорошо подходит для случая, когда общие шаги алгоритма идентичны, но некоторые части различаются по своей внутренней реализации, позволяя абстрагировать такие части с помощью отдельных подклассов.

### Пример реализации

```ts
import fs from "fs";
import path from "path";
import { csvParse } from "d3-dsv";
import { marked } from 'marked';

const __dirname = path.resolve()

abstract class FileParser {

  // Шаблонный метод
  parse(filePath: string) {
    const content = this.readFile(filePath);
    const fileData = this.parseFile(content);

    this.processData(fileData);
  }

  readFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
  }

  abstract parseFile(fileContent: string): any;

  processData(fileData: any[]) {
    console.log(fileData);
  }
}


class CsvParser extends FileParser {
  parseFile(fileContent: string) {
    return csvParse(fileContent);
  }
}

class MarkdownParser extends FileParser {
  parseFile(fileContent: string) {
    return marked.parse(fileContent);
  }
}

// Using
const csvParser = new CsvParser();
const mdParser = new MarkdownParser();

csvParser.parse(path.join(__dirname, "Users.csv"));
mdParser.parse(path.join(__dirname, "Users.md"));

```
