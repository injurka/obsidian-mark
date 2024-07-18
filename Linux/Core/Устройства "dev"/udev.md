Менеджер устройств `udev` отвечает за управление файлами устройств в пользовательском пространстве. Он получает уведомления от ядра о подключении новых устройств и создает соответствующие файлы устройств, а также выполняет их инициализацию.

## Файловая система devtmpfs

Файловая система `devtmpfs` решает проблему доступности устройств во время загрузки. Ядро создает файлы устройств по мере необходимости и уведомляет `udevd` о наличии нового устройства. `udevd` не создает файлы устройств, но выполняет инициализацию устройства и создает символические ссылки для идентификации устройств.

Пример символических ссылок для диска `/dev/sda`:
```bash
$ ls -l /dev/disk/by-id
lrwxrwxrwx 1 root root 9 Jul 26 10:23 scsi-SATA_WDC_WD3200AAJS-_WD-WMAV2FU80671 -> ../../sda
lrwxrwxrwx 1 root root 10 Jul 26 10:23 scsi-SATA_WDC_WD3200AAJS-_WD-WMAV2FU80671-part1 -> ../../sda1
lrwxrwxrwx 1 root root 10 Jul 26 10:23 scsi-SATA_WDC_WD3200AAJS-_WD-WMAV2FU80671-part2 -> ../../sda2
lrwxrwxrwx 1 root root 10 Jul 26 10:23 scsi-SATA_WDC_WD3200AAJS-_WD-WMAV2FU80671-part5 -> ../../sda5
```

## Работа и настройка менеджера udevd

Демон `udevd` работает следующим образом:
1. Получает уведомление о событии (`uevent`) от ядра.
2. Загружает все атрибуты события.
3. Анализирует свои правила, фильтрует и обновляет событие, выполняет соответствующие действия.

Пример события `uevent`:
```bash
ACTION=change
DEVNAME=sde
DEVPATH=/devices/pci0000:00/0000:00:1a.0/usb1/1-1/1-1.2/1-1.2:1.0/host4/target4:0:0/4:0:0:3/block/sde
DEVTYPE=disk
DISK_MEDIA_CHANGE=1
MAJOR=8
MINOR=64
SEQNUM=2752
SUBSYSTEM=block
UDEV_LOG=3
```

Файлы правил находятся в каталогах `/lib/udev/rules.d` и `/etc/udev/rules.d`. Правила в `/etc` переопределяют правила в `/lib`.

Пример правила для диска ATA:
```bash
KERNEL=="sd*[!0-9]|sr*", ENV{ID_SERIAL}!="?*", SUBSYSTEMS=="scsi", ATTRS{vendor}=="ATA", IMPORT{program}="ata_id --export $devnode"
```

## Команда udevadm

Программа `udevadm` — это инструмент администрирования `udevd`. С ее помощью можно перезагрузить правила, инициировать события, а также изучать системные устройства и мониторить события `uevents`.

Пример использования `udevadm` для изучения устройства `/dev/sda`:
```bash
$ udevadm info --query=all --name=/dev/sda
```

Пример вывода:
```bash
P: /devices/pci0000:00/0000:00:1f.2/host0/target0:0:0/0:0:0:0/block/sda
N: sda
S: disk/by-id/ata-WDC_WD3200AAJS-22L7A0_WD-WMAV2FU80671
S: disk/by-id/scsi-SATA_WDC_WD3200AAJS-_WD-WMAV2FU80671
S: disk/by-id/wwn-0x50014ee057faef84
S: disk/by-path/pci-0000:00:1f.2-scsi-0:0:0:0
E: DEVLINKS=/dev/disk/by-id/ata-WDC_WD3200AAJS-22L7A0_WD-WMAV2FU80671 /dev/disk/by-id/scsi-SATA_WDC_WD3200AAJS-_WD-WMAV2FU80671 /dev/disk/by-id/wwn-0x50014ee057faef84 /dev/disk/by-path/pci-0000:00:1f.2-scsi-0:0:0:0
E: DEVNAME=/dev/sda
E: DEVPATH=/devices/pci0000:00/0000:00:1f.2/host0/target0:0:0/0:0:0:0/block/sda
E: DEVTYPE=disk
E: ID_ATA=1
E: ID_ATA_DOWNLOAD_MICROCODE=1
E: ID_ATA_FEATURE_SET_AAM=1
```

Пример отслеживания событий `uevents`:
```bash
$ udevadm monitor
```

Пример вывода:
```bash
KERNEL[658299.569485] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2 (usb)
KERNEL[658299.569667] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2/2-1.2:1.0 (usb)
KERNEL[658299.570614] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2/2-1.2:1.0/host15 (scsi)
KERNEL[658299.570645] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2/2-1.2:1.0/host15/scsi_host/host15 (scsi_host)
UDEV [658299.622579] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2 (usb)
UDEV [658299.623014] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2/2-1.2:1.0 (usb)
UDEV [658299.623673] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2/2-1.2:1.0/host15 (scsi)
UDEV [658299.623690] add /devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.2/2-1.2:1.0/host15/scsi_host/host15 (scsi_host)
```

Дополнительные параметры:
- `--kernel`: Показывает только события ядра.
- `--udev`: Показывает только события, обрабатываемые `udevd`.
- `--property`: Показывает атрибуты событий.
- `--subsystem-match=scsi`: Фильтрует события по подсистеме SCSI.

