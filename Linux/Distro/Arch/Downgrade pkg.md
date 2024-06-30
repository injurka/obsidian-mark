## CLI

### manjaro-downgrade

https://wiki.manjaro.org/index.php/Downgrading_packages

```bash
sudo pacman -S manjaro-downgrade

sudo manjaro-downgrade [PACKAGE, ...] [-- [PACMAN OPTIONS]]

sudo manjaro-downgrade firefox
```

### downgrade

```bash
yay -S downgrade

sudo downgrade [PACKAGE, ...] [-- [PACMAN OPTIONS]]

sudo downgrade firefox
```

## Manually from pacman cache

Каталог `/var/cache/pacman/pkg` содержит старые версии пакетов. Сначала найдите пакет, который вы хотите обновить, в этом каталоге, а затем используйте `pacman -U` для его установки. Например, это может выглядеть следующим образом:

Мы должны использовать следующую команду для установки ранее установленных версий пакетов, которые необходимо понизить:

```bash
sudo pacman -U /var/cache/pacman/pkg/firefox-64.0.2-1-x86_64.pkg.tar.xz
```
Обеспечение того, чтобы пакеты с пониженным рейтингом больше не обновлялись

Чтобы предотвратить обновление этих пакетов при следующем запуске обновлений, вы можете добавить их в список игнорируемых в `/etc/pacman.conf`. Найдите раздел, который выглядит следующим образом:

```
# Pacman не будет обновлять пакеты, перечисленные в IgnorePkg и входящие в IgnoreGroup

# IgnorePkg =
```

Удалите комментарий перед **IgnorePkg** и добавьте название пакета в список. Когда вы закончите, это должно выглядеть следующим образом:

```
# Pacman не будет обновлять пакеты, перечисленные в IgnorePkg и входящие в IgnoreGroup

IgnorePkg = firefox
```

Как только это будет сделано, пакет больше не будет обновляться в будущих обновлениях, пока вы вручную не удалите его из строки **IgnorePkg** в файле `/etc/pacman.conf`

## Manually from pacman cache

```bash
curl -s https://archive.archlinux.org/packages/.all/index.0.xz \
  | xz -d \
  | grep firefox
```

```shell
sudo pacman -U \
  https://archive.archlinux.org/packages/.all/firefox-126.0.1-1-x86_64.pkg.tar.zst
```

## Build from AUR

```bash
git clone https://aur.archlinux.org/firefox-git.git
cd firefox-git
# Указать нужный тег (не проверял):
sed -i 's/branch=develop/branch=3.7.2/' PKGBUILD
makepkg -si
```

## Источники
- #### [manjaro](https://wiki.manjaro.org/index.php/Downgrading_packages)
- #### [zebradil](https://zebradil.me/ru/post/2023-05-16-how-to-downgrade-a-package-in-arch-linux/)
