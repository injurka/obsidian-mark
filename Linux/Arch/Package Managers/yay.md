## Build local

В первую очередь всегда полезно обновить кэш пакетов и обновить систему:

**Интересно:** [Как обрезать и вырезать видео с помощью FFmpeg в Linux](https://itshaman.ru/articles/3902/kak-obrezat-i-vyrezat-video-s-pomoshchyu-ffmpeg-v-linux)

```sh
sudo pacman -Syu
```

Установите необходимые пакеты `base-devel` (содержит такие инструменты, как `makepkg` и т.д.) и git (необходим для клонирования git-репозитория Yay).

```sh
sudo pacman -S --needed base-devel git
```

При использовании флага `--needed` он НЕ будет переустанавливать уже установленные пакеты.

```sh
git clone https://aur.archlinux.org/yay.git

cd yay

makepkg -si
```

---

## Commands

| Command                           | Description                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `yay`                             | Alias to `yay -Syu`.                                                                                       |
| `yay <Search Term>`               | Present package-installation selection menu.                                                               |
| `yay -Bi <dir>`                   | Install dependencies and build a local PKGBUILD.                                                           |
| `yay -G <AUR Package>`            | Download PKGBUILD from ABS or AUR. (yay v12.0+)                                                            |
| `yay -Gp <AUR Package>`           | Print to stdout PKGBUILD from ABS or AUR.                                                                  |
| `yay -Ps`                         | Print system statistics.                                                                                   |
| `yay -Syu --devel`                | Perform system upgrade, but also check for development package updates.                                    |
| `yay -Syu --timeupdate`           | Perform system upgrade and use PKGBUILD modification time (not version number) to determine update.        |
| `yay -Wu <AUR Package>`           | Unvote for package (Requires setting `AUR_USERNAME` and `AUR_PASSWORD` environment variables) (yay v11.3+) |
| `yay -Wv <AUR Package>`           | Vote for package (Requires setting `AUR_USERNAME` and `AUR_PASSWORD` environment variables). (yay v11.3+)  |
| `yay -Y --combinedupgrade --save` | Make combined upgrade the default mode.                                                                    |
| `yay -Y --gendb`                  | Generate development package database used for devel update.                                               |
| `yay -Yc`                         | Clean unneeded dependencies.                                                                               |