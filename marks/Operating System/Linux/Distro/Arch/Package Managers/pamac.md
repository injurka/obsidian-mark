Pamac - менеджер управления пакетами Archlinux с графическим интерфейсом.

Преимущество Pamac состоит в том, что этот пакетный менеджер может работать со множеством вариантов установки пакетов. Пользователю доступна поддержка AUR, Flatpak, SNAP. Получается, что Pamac объединяет в себе стандартный менеджер программ в любом дистрибутиве и помощника для работы с AUR. Этакий швейцарский нож - все в одном флаконе.


---

## Installing Pamac from the AUR


```sh
yay -S pamac-aur
```


---

## Build local

```sh
sudo pacman -Syu

sudo pacman -S --needed base-devel git

git clone https://aur.archlinux.org/archlinux-appstream-data-pamac.git
cd archlinux-appstream-data-pamac
makepkg -si
```