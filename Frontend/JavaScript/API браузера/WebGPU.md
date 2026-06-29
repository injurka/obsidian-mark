# WebGPU

## 1. Что такое WebGPU и почему WebGL уходит в прошлое

**WebGPU** — это новый стандарт веб-API, предоставляющий низкоуровневый, высокопроизводительный доступ к графическому ускорителю (видеокарте) компьютера или мобильного устройства непосредственно из браузера.

### Почему WebGL устарел?
1.  **Наследие OpenGL:** WebGL основан на OpenGL ES (стандарте начала 2000-х годов). Он работает как глобальный конечный автомат (state machine), что заставляет CPU совершать огромное количество проверок и переключений состояний на каждом кадре. Это создает «узкое горлышко» на уровне процессора (CPU overhead).
2.  **Несовместимость с современными GPU:** Архитектура современных видеокарт сильно изменилась. Появились новые нативные API (Vulkan, Metal, DirectX 12). WebGL не умеет эффективно использовать их возможности.
3.  **Отсутствие вычислений:** WebGL спроектирован только для рисования треугольников. Он не поддерживает вычислительные шейдеры (Compute Shaders).

### Преимущества WebGPU:
*   **Современная архитектура:** WebGPU транслируется напрямую в нативные системные API (Metal на macOS/iOS, DirectX 12 на Windows, Vulkan на Linux/Android).
*   **Вычислительные шейдеры (Compute Shaders):** Возможность использовать GPU для тяжелых параллельных математических расчетов (машинное обучение, нейросети, физика, симуляции частиц) без необходимости отрисовывать что-либо на экране.
*   **Снижение нагрузки на CPU:** Подготовка команд для видеокарты происходит пакетами (через Command Buffers), что минимизирует обращения из JavaScript к графическому драйверу.

---

## 2. Ключевые сущности WebGPU

Работа с WebGPU строится вокруг четкого разделения ресурсов и команд:

```text
[Браузер] ──► 1. GPUAdapter (Физическая видеокарта) 
                   │
                   ▼
              2. GPUDevice (Логический интерфейс управления)
                   │
                   ├─► 3. GPUPipeline (Конвейер: рендеринг или вычисления)
                   ├─► 4. GPUBuffer (Память на видеокарте)
                   └─► 5. GPUCommandEncoder (Запись команд для GPU)
```

1.  **GPUAdapter (Адаптер):** Представляет конкретную физическую видеокарту устройства (интегрированную или дискретную).
2.  **GPUDevice (Устройство):** Логический интерфейс, через который создаются ресурсы (буферы, текстуры, конвейеры).
3.  **GPUBuffers (Буферы):** Блоки памяти в VRAM (видеопамяти), где хранятся сырые данные (координаты вершин, матрицы трансформации или массивы чисел).
4.  **GPUPipeline (Конвейер):** Жесткое описание шагов, которые GPU должен выполнить над данными. Бывает двух типов: `GPURenderPipeline` (для отрисовки графики) и `GPUComputePipeline` (для вычислений).

---

## 3. Язык шейдеров WGSL (WebGPU Shading Language)

Вместо GLSL, использовавшегося в WebGL, WebGPU вводит новый язык — **WGSL**. Синтаксически он вдохновлен Rust и Swift, строго типизирован и более безопасен при компиляции.

Пример простого вычислительного шейдера на WGSL, который умножает массив чисел на два:

```rust
// Указываем структуру данных в буфере
struct DataBuffer {
  numbers: array<f32>,
}

// Связываем буфер с шейдером (binding 0)
@group(0) @binding(0) var<storage, read_write> data : DataBuffer;

// Точка входа для вычислительного шейдера
@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
  let index = global_id.x;
  
  // Умножаем число на 2
  data.numbers[index] = data.numbers[index] * 2.0;
}
```

---

## 4. Практический пример: Compute Shader на JS

Давайте напишем код, который инициализирует WebGPU, загружает массив чисел на видеокарту, удваивает их с помощью шейдера выше и читает результат обратно.

```javascript
async function runComputeShader() {
  // 1. Инициализация API
  if (!navigator.gpu) {
    console.error("WebGPU не поддерживается вашим браузером");
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  // 2. Подготовка данных
  const inputData = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]);
  
  // Создаем буфер в VRAM для хранения и вычислений (Storage Buffer)
  const gpuBuffer = device.createBuffer({
    size: inputData.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
  });
  
  // Копируем данные из CPU-памяти в GPU-буфер
  new Float32Array(gpuBuffer.getMappedRange()).set(inputData);
  gpuBuffer.unmap();

  // 3. Компиляция WGSL Шейдера
  const shaderCode = `
    @group(0) @binding(0) var<storage, read_write> data : array<f32>;
    @compute @workgroup_size(8)
    fn main(@builtin(global_invocation_id) id : vec3<u32>) {
      data[id.x] = data[id.x] * 2.0;
    }
  `;
  
  const shaderModule = device.createShaderModule({ code: shaderCode });

  // 4. Создание вычислительного конвейера (Compute Pipeline)
  const pipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
      module: shaderModule,
      entryPoint: 'main',
    },
  });

  // Связываем буфер с конвейером (Bind Group)
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: gpuBuffer } }],
  });

  // 5. Запись команд и запуск (Command Encoding)
  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.dispatchWorkgroups(1); // Запуск 1 рабочей группы
  passEncoder.end();

  // Создаем буфер для чтения результата обратно в CPU
  const readBuffer = device.createBuffer({
    size: inputData.byteLength,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });

  // Команда копирования результатов из вычислительного буфера в буфер чтения
  commandEncoder.copyBufferToBuffer(gpuBuffer, 0, readBuffer, 0, inputData.byteLength);

  // Отправляем очередь команд на выполнение GPU
  device.queue.submit([commandEncoder.finish()]);

  // 6. Чтение результата
  await readBuffer.mapAsync(GPUMapMode.READ);
  const result = new Float32Array(readBuffer.getMappedRange());
  console.log("Результат вычислений на GPU:", Array.from(result)); 
  // Выведет: [2, 4, 6, 8, 10, 12, 14, 16]
  
  readBuffer.unmap();
}

runComputeShader();
```
