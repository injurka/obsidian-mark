Linux/
├── Linux.md
├── 00 Навигация и метаданные/
│   ├── Карта раздела.md
│   ├── Глоссарий.md
│   ├── Источники.md
│   ├── Чеклисты.md
│   ├── Шпаргалки.md
│   ├── FAQ.md
│   ├── Troubleshooting Index.md
│   └── Лабораторные работы.md
│
├── 01 Основы Linux/
│   ├── Основы Linux.md
│   ├── История и философия.md
│   ├── GNU и Linux.md
│   ├── POSIX и Unix.md
│   ├── Свободное ПО и лицензии.md
│   ├── Архитектура операционной системы.md
│   ├── Уровни абстракции.md
│   ├── Пользовательское пространство.md
│   ├── Ядро Linux.md
│   ├── Системные вызовы.md
│   ├── Библиотеки.md
│   ├── Демоны и службы.md
│   ├── Стандарты FHS LSB.md
│   ├── Версии ядра.md
│   ├── Release Cycle.md
│   ├── Документация man info help.md
│   └── Терминология.md
│
├── 02 Установка и загрузка/
│   ├── Установка и загрузка.md
│   ├── Требования к оборудованию.md
│   ├── Образы ISO и проверка.md
│   ├── Создание загрузочного носителя.md
│   ├── BIOS и UEFI/
│   │   ├── BIOS.md
│   │   ├── UEFI.md
│   │   ├── Secure Boot.md
│   │   ├── TPM.md
│   │   ├── CSM.md
│   │   └── Настройки прошивки.md
│   ├── Разметка диска/
│   │   ├── MBR и GPT.md
│   │   ├── EFI System Partition.md
│   │   ├── Swap.md
│   │   ├── Root Home Var.md
│   │   ├── LVM разметка.md
│   │   ├── Btrfs разметка.md
│   │   ├── Шифрование при установке.md
│   │   └── Dual Boot.md
│   ├── Загрузчики/
│   │   ├── GRUB.md
│   │   ├── systemd boot.md
│   │   ├── rEFInd.md
│   │   ├── Limine.md
│   │   ├── Extlinux.md
│   │   ├── Kernel Parameters.md
│   │   ├── Восстановление загрузчика.md
│   │   └── Rescue Mode.md
│   ├── Initramfs/
│   │   ├── initramfs.md
│   │   ├── dracut.md
│   │   ├── mkinitcpio.md
│   │   └── update initramfs.md
│   ├── Процесс загрузки.md
│   ├── LiveCD и Rescue.md
│   ├── Установка в VirtualBox.md
│   ├── Установка в VMware.md
│   ├── Установка в QEMU KVM.md
│   ├── Установка в WSL.md
│   ├── Установка на ARM.md
│   └── Post Install.md
│
├── 03 Файловая система и хранилища/
│   ├── Файловая система.md
│   ├── Иерархия FHS.md
│   ├── Каталоги/
│   │   ├── root.md
│   │   ├── boot.md
│   │   ├── dev.md
│   │   ├── etc.md
│   │   ├── home.md
│   │   ├── lib и lib64.md
│   │   ├── media.md
│   │   ├── mnt.md
│   │   ├── opt.md
│   │   ├── proc.md
│   │   ├── root home.md
│   │   ├── run.md
│   │   ├── sbin.md
│   │   ├── srv.md
│   │   ├── sys.md
│   │   ├── tmp.md
│   │   ├── usr.md
│   │   └── var.md
│   ├── Типы файлов.md
│   ├── Inode и Links.md
│   ├── Hardlink и Symlink.md
│   ├── Права доступа.md
│   ├── ACL.md
│   ├── Extended Attributes.md
│   ├── Quotas.md
│   ├── Mount и Umount.md
│   ├── fstab.md
│   ├── findmnt.md
│   ├── lsblk blkid.md
│   ├── df du.md
│   ├── Файловые системы/
│   │   ├── ext4.md
│   │   ├── XFS.md
│   │   ├── Btrfs.md
│   │   ├── ZFS.md
│   │   ├── F2FS.md
│   │   ├── NILFS2.md
│   │   ├── tmpfs.md
│   │   ├── SquashFS.md
│   │   ├── OverlayFS.md
│   │   ├── NFS.md
│   │   ├── CIFS SMB.md
│   │   ├── FAT32 exFAT NTFS.md
│   │   └── ISO9660 UDF.md
│   ├── Btrfs/
│   │   ├── Btrfs.md
│   │   ├── Subvolumes.md
│   │   ├── Snapshots.md
│   │   ├── Copy on Write.md
│   │   ├── Compression.md
│   │   ├── RAID профили.md
│   │   ├── Scrub Balance.md
│   │   └── Timeshift и Snapper.md
│   ├── LVM/
│   │   ├── LVM.md
│   │   ├── PV VG LV.md
│   │   ├── Создание и расширение.md
│   │   ├── Snapshots.md
│   │   ├── Thin Provisioning.md
│   │   └── LVM Repair.md
│   ├── RAID/
│   │   ├── RAID.md
│   │   ├── mdadm.md
│   │   ├── RAID0.md
│   │   ├── RAID1.md
│   │   ├── RAID5.md
│   │   ├── RAID6.md
│   │   ├── RAID10.md
│   │   └── Восстановление RAID.md
│   ├── Шифрование дисков/
│   │   ├── LUKS.md
│   │   ├── cryptsetup.md
│   │   ├── dm crypt.md
│   │   ├── Ключевые файлы.md
│   │   ├── TPM и Auto Unlock.md
│   │   └── Шифрование home.md
│   ├── Диски и SSD/
│   │   ├── SMART.md
│   │   ├── smartctl.md
│   │   ├── TRIM.md
│   │   ├── fstrim.md
│   │   ├── Badblocks.md
│   │   ├── Температура и здоровье.md
│   │   └── Восстановление данных.md
│   └── Сетевые хранилища.md
│
├── 04 Командная строка и Shell/
│   ├── Командная строка.md
│   ├── Терминалы и эмуляторы.md
│   ├── TTY PTY и консоли.md
│   ├── Bash/
│   │   ├── Bash.md
│   │   ├── Bashrc и Profile.md
│   │   ├── Переменные.md
│   │   ├── Массивы.md
│   │   ├── Условия.md
│   │   ├── Циклы.md
│   │   ├── Функции.md
│   │   ├── Подстановка команд.md
│   │   ├── Перенаправления.md
│   │   ├── Pipes.md
│   │   ├── Job Control.md
│   │   ├── Traps и Signals.md
│   │   ├── Debugging.md
│   │   ├── ShellCheck.md
│   │   └── Bash Scripting.md
│   ├── Другие оболочки/
│   │   ├── Zsh.md
│   │   ├── Fish.md
│   │   ├── Dash.md
│   │   ├── Ksh.md
│   │   ├── Nushell.md
│   │   ├── PowerShell.md
│   │   └── Oh My Zsh.md
│   ├── Multiplexers/
│   │   ├── tmux.md
│   │   ├── GNU screen.md
│   │   └── Zellij.md
│   ├── Prompt и оформление/
│   │   ├── PS1.md
│   │   ├── Starship.md
│   │   ├── Nerd Fonts.md
│   │   └── Цвета и ANSI.md
│   ├── Aliases и Functions.md
│   ├── История команд.md
│   ├── Автодополнение.md
│   └── Dotfiles.md
│
├── 05 Команды и CLI утилиты/
│   ├── Команды.md
│   ├── Навигация и файлы/
│   │   ├── pwd.md
│   │   ├── ls.md
│   │   ├── cd.md
│   │   ├── tree.md
│   │   ├── touch.md
│   │   ├── mkdir rmdir.md
│   │   ├── cp mv rm.md
│   │   ├── ln.md
│   │   ├── file stat.md
│   │   ├── find.md
│   │   ├── locate plocate.md
│   │   ├── xargs.md
│   │   └── fd ripgrep.md
│   ├── Текст и потоки/
│   │   ├── cat tac.md
│   │   ├── less more.md
│   │   ├── head tail.md
│   │   ├── grep.md
│   │   ├── sed.md
│   │   ├── awk.md
│   │   ├── cut paste.md
│   │   ├── sort uniq.md
│   │   ├── tr.md
│   │   ├── tee.md
│   │   ├── wc.md
│   │   ├── diff cmp.md
│   │   ├── patch.md
│   │   ├── column.md
│   │   ├── jq.md
│   │   ├── yq.md
│   │   └── iconv.md
│   ├── Система и информация/
│   │   ├── uname.md
│   │   ├── hostnamectl.md
│   │   ├── uptime.md
│   │   ├── date timedatectl.md
│   │   ├── env printenv.md
│   │   ├── which whereis type.md
│   │   ├── lscpu.md
│   │   ├── free.md
│   │   ├── lsusb lspci.md
│   │   ├── dmidecode.md
│   │   ├── inxi.md
│   │   └── neofetch fastfetch.md
│   ├── Поиск и анализ/
│   │   ├── strace.md
│   │   ├── ltrace.md
│   │   ├── lsof.md
│   │   ├── fuser.md
│   │   ├── watch.md
│   │   ├── time.md
│   │   ├── timeout.md
│   │   ├── parallel.md
│   │   └── expect.md
│   ├── Загрузка и передача/
│   │   ├── curl.md
│   │   ├── wget.md
│   │   ├── aria2.md
│   │   ├── rsync.md
│   │   ├── scp.md
│   │   ├── sftp.md
│   │   ├── rclone.md
│   │   └── magic wormhole.md
│   └── Рецепты команд.md
│
├── 06 Пользователи права и аутентификация/
│   ├── Пользователи и доступ.md
│   ├── Пользователи и группы/
│   │   ├── passwd shadow group gshadow.md
│   │   ├── useradd usermod userdel.md
│   │   ├── groupadd groupmod groupdel.md
│   │   ├── id groups.md
│   │   ├── chage.md
│   │   ├── su.md
│   │   └── runuser.md
│   ├── Права и владельцы/
│   │   ├── chmod.md
│   │   ├── chown chgrp.md
│   │   ├── umask.md
│   │   ├── SUID SGID Sticky Bit.md
│   │   ├── ACL setfacl getfacl.md
│   │   └── Capabilities.md
│   ├── sudo и doas/
│   │   ├── sudo.md
│   │   ├── sudoers.md
│   │   ├── visudo.md
│   │   └── doas.md
│   ├── PAM/
│   │   ├── PAM.md
│   │   ├── pam.d.md
│   │   ├── Парольные политики.md
│   │   ├── MFA 2FA.md
│   │   └── FIDO2 U2F.md
│   ├── Политики безопасности/
│   │   ├── SELinux.md
│   │   ├── AppArmor.md
│   │   ├── Polkit.md
│   │   ├── seccomp.md
│   │   └── Landlock.md
│   └── SSH ключи и агенты.md
│
├── 07 Процессы память и производительность/
│   ├── Процессы и производительность.md
│   ├── Процессы/
│   │   ├── PID PPID PGID SID.md
│   │   ├── ps.md
│   │   ├── pgrep pkill.md
│   │   ├── kill killall.md
│   │   ├── nice renice.md
│   │   ├── nohup disown.md
│   │   ├── bg fg jobs.md
│   │   ├── Signals.md
│   │   ├── Zombie и Orphan процессы.md
│   │   └── cgroups.md
│   ├── Мониторинг/
│   │   ├── top.md
│   │   ├── htop btop.md
│   │   ├── atop.md
│   │   ├── glances.md
│   │   ├── iotop.md
│   │   ├── iftop nload.md
│   │   ├── vmstat.md
│   │   ├── iostat.md
│   │   ├── mpstat.md
│   │   ├── pidstat.md
│   │   └── dstat.md
│   ├── Память/
│   │   ├── RAM.md
│   │   ├── Virtual Memory.md
│   │   ├── Page Cache.md
│   │   ├── Swap.md
│   │   ├── Swappiness.md
│   │   ├── OOM Killer.md
│   │   ├── zram.md
│   │   ├── zswap.md
│   │   ├── HugePages.md
│   │   └── Memory Leaks.md
│   ├── CPU и планировщик/
│   │   ├── CPU Governors.md
│   │   ├── CPU Affinity taskset.md
│   │   ├── IRQ Affinity.md
│   │   ├── Process Schedulers.md
│   │   ├── chrt и Real Time.md
│   │   ├── ulimit.md
│   │   └── systemd resource control.md
│   ├── Профилирование/
│   │   ├── perf.md
│   │   ├── eBPF.md
│   │   ├── bpftrace.md
│   │   ├── flamegraph.md
│   │   ├── valgrind.md
│   │   └── gdb.md
│   └── Оптимизация системы.md
│
├── 08 Ядро драйверы и оборудование/
│   ├── Ядро и оборудование.md
│   ├── Управление ядром/
│   │   ├── Kernel Configuration.md
│   │   ├── Kernel Modules.md
│   │   ├── modprobe insmod rmmod.md
│   │   ├── lsmod modinfo.md
│   │   ├── DKMS.md
│   │   ├── Сборка ядра.md
│   │   ├── Kernel Panic.md
│   │   ├── Kernel Parameters.md
│   │   └── sysctl.md
│   ├── Udev и устройства/
│   │   ├── udev.md
│   │   ├── udev rules.md
│   │   ├── sysfs.md
│   │   ├── procfs.md
│   │   ├── devtmpfs.md
│   │   └── Горячее подключение.md
│   ├── Графика/
│   │   ├── DRM KMS.md
│   │   ├── Mesa.md
│   │   ├── OpenGL.md
│   │   ├── Vulkan.md
│   │   ├── VAAPI VDPAU.md
│   │   ├── NVIDIA.md
│   │   ├── AMDGPU.md
│   │   ├── Intel Graphics.md
│   │   ├── PRIME и гибридная графика.md
│   │   └── Framebuffer.md
│   ├── Аудио/
│   │   ├── ALSA.md
│   │   ├── PulseAudio.md
│   │   ├── PipeWire.md
│   │   ├── WirePlumber.md
│   │   ├── Bluetooth Audio.md
│   │   └── MIDI.md
│   ├── Устройства ввода/
│   │   ├── libinput.md
│   │   ├── Клавиатура.md
│   │   ├── Мышь тачпад.md
│   │   ├── Графический планшет.md
│   │   ├── Геймпады.md
│   │   └── Раскладки XKB.md
│   ├── Питание и ноутбуки/
│   │   ├── ACPI.md
│   │   ├── Battery.md
│   │   ├── TLP.md
│   │   ├── power profiles daemon.md
│   │   ├── thermald.md
│   │   ├── Suspend Hibernate.md
│   │   └── Laptop Mode.md
│   ├── Принтеры и сканеры/
│   │   ├── CUPS.md
│   │   ├── SANE.md
│   │   └── Avahi.md
│   ├── Bluetooth.md
│   ├── Webcam.md
│   ├── USB.md
│   └── Firmware и microcode.md
│
├── 09 Systemd и службы/
│   ├── Systemd.md
│   ├── Архитектура systemd.md
│   ├── systemctl.md
│   ├── journalctl.md
│   ├── Units/
│   │   ├── service.md
│   │   ├── socket.md
│   │   ├── target.md
│   │   ├── timer.md
│   │   ├── mount.md
│   │   ├── automount.md
│   │   ├── path.md
│   │   ├── device.md
│   │   ├── scope.md
│   │   └── slice.md
│   ├── Создание служб.md
│   ├── systemd timers.md
│   ├── systemd user.md
│   ├── systemd logind.md
│   ├── systemd networkd.md
│   ├── systemd resolved.md
│   ├── systemd timesyncd.md
│   ├── systemd boot.md
│   ├── systemd coredump.md
│   ├── systemd homed.md
│   ├── systemd oomd.md
│   ├── systemd analyze.md
│   ├── Логи и ротация/
│   │   ├── journald.md
│   │   ├── rsyslog.md
│   │   ├── syslog ng.md
│   │   ├── logrotate.md
│   │   └── auditd.md
│   ├── Cron и аналогичные планировщики/
│   │   ├── cron crontab.md
│   │   ├── anacron.md
│   │   ├── at.md
│   │   └── systemd timers.md
│   └── Альтернативы systemd/
│       ├── OpenRC.md
│       ├── runit.md
│       ├── s6.md
│       ├── dinit.md
│       └── SysVinit.md
│
├── 10 Сети/
│   ├── Сети.md
│   ├── Основы/
│   │   ├── OSI и TCP IP.md
│   │   ├── IPv4.md
│   │   ├── IPv6.md
│   │   ├── MAC адреса.md
│   │   ├── CIDR и подсети.md
│   │   ├── Маршрутизация.md
│   │   ├── MTU.md
│   │   ├── VLAN.md
│   │   ├── Bonding.md
│   │   └── Bridge.md
│   ├── Интерфейсы и настройка/
│   │   ├── iproute2.md
│   │   ├── ip.md
│   │   ├── ss.md
│   │   ├── ethtool.md
│   │   ├── NetworkManager.md
│   │   ├── nmcli.md
│   │   ├── nmtui.md
│   │   ├── systemd networkd.md
│   │   ├── Netplan.md
│   │   ├── ifconfig и route.md
│   │   ├── wpa_supplicant.md
│   │   └── iwd.md
│   ├── DNS/
│   │   ├── DNS.md
│   │   ├── resolv.conf.md
│   │   ├── systemd resolved.md
│   │   ├── dnsmasq.md
│   │   ├── Unbound.md
│   │   ├── BIND.md
│   │   ├── dig nslookup host.md
│   │   └── DNS over HTTPS TLS.md
│   ├── DHCP.md
│   ├── Wi Fi.md
│   ├── Bluetooth Networking.md
│   ├── Firewall/
│   │   ├── Firewall.md
│   │   ├── nftables.md
│   │   ├── iptables.md
│   │   ├── firewalld.md
│   │   ├── ufw.md
│   │   ├── Fail2ban.md
│   │   └── Port Knocking.md
│   ├── VPN и туннели/
│   │   ├── WireGuard.md
│   │   ├── OpenVPN.md
│   │   ├── IPsec.md
│   │   ├── Tailscale.md
│   │   ├── ZeroTier.md
│   │   ├── SSH Tunnels.md
│   │   ├── SOCKS Proxy.md
│   │   └── Tor.md
│   ├── Диагностика/
│   │   ├── ping.md
│   │   ├── traceroute tracepath.md
│   │   ├── mtr.md
│   │   ├── tcpdump.md
│   │   ├── Wireshark.md
│   │   ├── nmap.md
│   │   ├── netcat socat.md
│   │   ├── arp ndp.md
│   │   └── Troubleshooting сетей.md
│   └── Прокси и балансировка/
│       ├── Nginx.md
│       ├── HAProxy.md
│       ├── Squid.md
│       ├── Traefik.md
│       └── Caddy.md
│
├── 11 Удаленный доступ и серверы/
│   ├── Серверное администрирование.md
│   ├── SSH/
│   │   ├── SSH.md
│   │   ├── sshd_config.md
│   │   ├── ssh_config.md
│   │   ├── SSH Keys.md
│   │   ├── ssh agent.md
│   │   ├── ssh copy id.md
│   │   ├── SCP SFTP.md
│   │   ├── Port Forwarding.md
│   │   ├── Bastion и Jump Host.md
│   │   └── SSH Hardening.md
│   ├── Web/
│   │   ├── HTTP и HTTPS.md
│   │   ├── TLS и сертификаты.md
│   │   ├── Nginx.md
│   │   ├── Apache.md
│   │   ├── Caddy.md
│   │   ├── PHP FPM.md
│   │   ├── Let's Encrypt Certbot.md
│   │   └── Virtual Hosts.md
│   ├── Файловые сервисы/
│   │   ├── Samba.md
│   │   ├── NFS.md
│   │   ├── FTP.md
│   │   ├── SFTP.md
│   │   ├── WebDAV.md
│   │   └── Syncthing.md
│   ├── Почта/
│   │   ├── SMTP.md
│   │   ├── Postfix.md
│   │   ├── Dovecot.md
│   │   ├── DKIM DMARC SPF.md
│   │   └── Mail Server Security.md
│   ├── Базы данных/
│   │   ├── PostgreSQL.md
│   │   ├── MariaDB MySQL.md
│   │   ├── SQLite.md
│   │   ├── Redis.md
│   │   ├── MongoDB.md
│   │   ├── Backup и Restore.md
│   │   └── Репликация.md
│   ├── DNS и directory services/
│   │   ├── BIND.md
│   │   ├── Unbound.md
│   │   ├── Pi hole.md
│   │   ├── LDAP.md
│   │   ├── FreeIPA.md
│   │   └── Active Directory Integration.md
│   └── Домашний сервер и NAS.md
│
├── 12 Безопасность/
│   ├── Безопасность.md
│   ├── Модель угроз.md
│   ├── Hardening/
│   │   ├── Hardening.md
│   │   ├── Обновления безопасности.md
│   │   ├── Минимизация поверхности атаки.md
│   │   ├── Безопасная настройка SSH.md
│   │   ├── sysctl hardening.md
│   │   ├── Kernel Hardening.md
│   │   ├── Secure Boot.md
│   │   └── Lynis.md
│   ├── Контроль доступа/
│   │   ├── DAC.md
│   │   ├── MAC.md
│   │   ├── SELinux.md
│   │   ├── AppArmor.md
│   │   ├── Polkit.md
│   │   └── Linux Capabilities.md
│   ├── Криптография/
│   │   ├── GPG.md
│   │   ├── OpenSSL.md
│   │   ├── Hashes.md
│   │   ├── Управление ключами.md
│   │   ├── LUKS.md
│   │   ├── age.md
│   │   └── Password Managers.md
│   ├── Аудит и обнаружение/
│   │   ├── auditd.md
│   │   ├── AIDE.md
│   │   ├── rkhunter.md
│   │   ├── chkrootkit.md
│   │   ├── ClamAV.md
│   │   ├── Wazuh.md
│   │   └── Log Analysis.md
│   ├── Incident Response.md
│   ├── Backup Strategy.md
│   ├── Privacy.md
│   └── Безопасность десктопа.md
│
├── 13 Архивирование и резервное копирование/
│   ├── Архивирование и бэкапы.md
│   ├── Архиваторы/
│   │   ├── tar.md
│   │   ├── gzip gunzip zcat.md
│   │   ├── bzip2.md
│   │   ├── xz.md
│   │   ├── zstd.md
│   │   ├── zip unzip.md
│   │   ├── 7z.md
│   │   ├── rar unrar.md
│   │   └── cpio.md
│   ├── Резервное копирование/
│   │   ├── rsync.md
│   │   ├── rsnapshot.md
│   │   ├── BorgBackup.md
│   │   ├── Restic.md
│   │   ├── Duplicity.md
│   │   ├── Kopia.md
│   │   ├── rclone.md
│   │   ├── Timeshift.md
│   │   ├── Snapper.md
│   │   ├── Déjà Dup.md
│   │   └── Bare Metal Recovery.md
│   ├── Стратегии бэкапов/
│   │   ├── Правило 3 2 1.md
│   │   ├── Полные инкрементальные дифференциальные.md
│   │   ├── Шифрование бэкапов.md
│   │   ├── Проверка восстановления.md
│   │   └── Retention Policy.md
│   └── Восстановление данных.md
│
├── 14 Виртуализация и контейнеры/
│   ├── Виртуализация и контейнеры.md
│   ├── Виртуализация/
│   │   ├── KVM.md
│   │   ├── QEMU.md
│   │   ├── libvirt.md
│   │   ├── virt manager.md
│   │   ├── virsh.md
│   │   ├── SPICE.md
│   │   ├── VFIO и GPU Passthrough.md
│   │   ├── SR IOV.md
│   │   ├── VirtualBox.md
│   │   ├── VMware.md
│   │   ├── Proxmox.md
│   │   └── Vagrant.md
│   ├── Контейнеры/
│   │   ├── Docker.md
│   │   ├── Dockerfile.md
│   │   ├── Docker Compose.md
│   │   ├── Podman.md
│   │   ├── Buildah.md
│   │   ├── Skopeo.md
│   │   ├── LXC LXD.md
│   │   ├── Incus.md
│   │   ├── systemd nspawn.md
│   │   ├── Rootless Containers.md
│   │   └── Container Security.md
│   ├── Оркестрация/
│   │   ├── Kubernetes.md
│   │   ├── k3s.md
│   │   ├── Minikube.md
│   │   ├── Helm.md
│   │   ├── Docker Swarm.md
│   │   └── Nomad.md
│   └── Namespaces и cgroups.md
│
├── 15 Дистрибутивы и пакетные менеджеры/
│   ├── Дистрибутивы.md
│   ├── Выбор дистрибутива.md
│   ├── Семейства дистрибутивов/
│   │   ├── Debian и Ubuntu.md
│   │   ├── Red Hat и Fedora.md
│   │   ├── Arch Linux.md
│   │   ├── Gentoo.md
│   │   ├── SUSE и openSUSE.md
│   │   ├── Alpine.md
│   │   ├── Slackware.md
│   │   ├── Void Linux.md
│   │   ├── NixOS.md
│   │   ├── Guix System.md
│   │   ├── Kali Linux.md
│   │   ├── Linux Mint.md
│   │   ├── Manjaro.md
│   │   ├── EndeavourOS.md
│   │   ├── Pop_OS.md
│   │   └── Raspberry Pi OS.md
│   ├── Пакетные менеджеры/
│   │   ├── APT/
│   │   │   ├── apt.md
│   │   │   ├── apt cache.md
│   │   │   ├── dpkg.md
│   │   │   ├── sources.list.md
│   │   │   ├── PPA.md
│   │   │   └── deb пакеты.md
│   │   ├── DNF YUM/
│   │   │   ├── dnf.md
│   │   │   ├── yum.md
│   │   │   ├── rpm.md
│   │   │   └── COPR.md
│   │   ├── Pacman/
│   │   │   ├── pacman.md
│   │   │   ├── makepkg.md
│   │   │   ├── PKGBUILD.md
│   │   │   ├── AUR.md
│   │   │   ├── yay.md
│   │   │   ├── paru.md
│   │   │   ├── pamac.md
│   │   │   └── downgrading.md
│   │   ├── Zypper.md
│   │   ├── Portage.md
│   │   ├── XBPS.md
│   │   ├── APK.md
│   │   ├── Nix/
│   │   │   ├── Nix.md
│   │   │   ├── nixpkgs.md
│   │   │   ├── nix shell.md
│   │   │   ├── nix flakes.md
│   │   │   ├── Home Manager.md
│   │   │   ├── Nix Language.md
│   │   │   ├── Overlays и Overrides.md
│   │   │   └── Garbage Collection.md
│   │   └── Guix.md
│   ├── Универсальные пакеты/
│   │   ├── Flatpak.md
│   │   ├── Flathub.md
│   │   ├── Snap.md
│   │   ├── AppImage.md
│   │   └── Distrobox.md
│   ├── Репозитории и ключи.md
│   ├── Обновление и rollback.md
│   └── Сборка пакетов из исходников.md
│
├── 16 Графическая среда/
│   ├── Графическая среда.md
│   ├── Display Server/
│   │   ├── X11.md
│   │   ├── Wayland.md
│   │   ├── XWayland.md
│   │   ├── Display Managers.md
│   │   ├── GDM.md
│   │   ├── SDDM.md
│   │   ├── LightDM.md
│   │   └── greetd.md
│   ├── Desktop Environments/
│   │   ├── GNOME.md
│   │   ├── KDE Plasma.md
│   │   ├── XFCE.md
│   │   ├── Cinnamon.md
│   │   ├── MATE.md
│   │   ├── LXQt.md
│   │   ├── Budgie.md
│   │   ├── COSMIC.md
│   │   └── Deepin.md
│   ├── Window Managers/
│   │   ├── i3.md
│   │   ├── Sway.md
│   │   ├── Hyprland.md
│   │   ├── bspwm.md
│   │   ├── AwesomeWM.md
│   │   ├── Qtile.md
│   │   ├── Openbox.md
│   │   ├── Fluxbox.md
│   │   ├── dwm.md
│   │   ├── XMonad.md
│   │   ├── river.md
│   │   └── Wayfire.md
│   ├── Композиторы/
│   │   ├── Picom.md
│   │   ├── Compton.md
│   │   ├── KWin.md
│   │   ├── Mutter.md
│   │   └── wlroots.md
│   ├── Темы и оформление/
│   │   ├── GTK.md
│   │   ├── Qt.md
│   │   ├── Icons.md
│   │   ├── Cursors.md
│   │   ├── Fonts.md
│   │   ├── Dark Mode.md
│   │   ├── Wallpapers.md
│   │   └── Theming.md
│   ├── Панели лаунчеры уведомления/
│   │   ├── Polybar.md
│   │   ├── Waybar.md
│   │   ├── Rofi.md
│   │   ├── Wofi.md
│   │   ├── dmenu.md
│   │   ├── Ulauncher.md
│   │   ├── Dunst.md
│   │   ├── Mako.md
│   │   └── Clipboard Managers.md
│   └── Скриншоты и запись экрана/
│       ├── Flameshot.md
│       ├── Spectacle.md
│       ├── grim slurp.md
│       ├── OBS Studio.md
│       ├── wf recorder.md
│       └── Kooha.md
│
├── 17 Разработка и DevOps/
│   ├── Разработка и DevOps.md
│   ├── Редакторы и IDE/
│   │   ├── Vim.md
│   │   ├── Neovim.md
│   │   ├── Emacs.md
│   │   ├── Nano.md
│   │   ├── VS Code.md
│   │   ├── VSCodium.md
│   │   ├── JetBrains.md
│   │   └── Helix.md
│   ├── Компиляторы и сборка/
│   │   ├── GCC.md
│   │   ├── Clang LLVM.md
│   │   ├── Make.md
│   │   ├── CMake.md
│   │   ├── Meson.md
│   │   ├── Ninja.md
│   │   ├── Autotools.md
│   │   ├── pkg config.md
│   │   └── ccache.md
│   ├── Языки программирования/
│   │   ├── C Cpp.md
│   │   ├── Python.md
│   │   ├── Rust.md
│   │   ├── Go.md
│   │   ├── Java.md
│   │   ├── JavaScript NodeJS.md
│   │   ├── TypeScript.md
│   │   ├── PHP.md
│   │   ├── Ruby.md
│   │   ├── Perl.md
│   │   └── Shell.md
│   ├── Git и контроль версий/
│   │   ├── Git.md
│   │   ├── Git Config.md
│   │   ├── Branches и Merge.md
│   │   ├── Rebase.md
│   │   ├── Submodules.md
│   │   ├── Git LFS.md
│   │   ├── SSH и Git.md
│   │   └── GitHub GitLab.md
│   ├── CI CD/
│   │   ├── GitHub Actions.md
│   │   ├── GitLab CI.md
│   │   ├── Jenkins.md
│   │   ├── Drone CI.md
│   │   └── ArgoCD.md
│   ├── Infrastructure as Code/
│   │   ├── Ansible.md
│   │   ├── Terraform.md
│   │   ├── OpenTofu.md
│   │   ├── Puppet.md
│   │   ├── Chef.md
│   │   └── Salt.md
│   ├── Development Environments/
│   │   ├── direnv.md
│   │   ├── Nix DevShell.md
│   │   ├── Devcontainers.md
│   │   ├── Docker Development.md
│   │   └── virtualenv pyenv.md
│   └── Линтеры форматтеры тесты.md
│
├── 18 Наблюдаемость и диагностика/
│   ├── Наблюдаемость и диагностика.md
│   ├── Логи/
│   │   ├── journalctl.md
│   │   ├── dmesg.md
│   │   ├── syslog.md
│   │   ├── logrotate.md
│   │   ├── Логи приложений.md
│   │   └── Анализ логов.md
│   ├── Мониторинг/
│   │   ├── Prometheus.md
│   │   ├── Node Exporter.md
│   │   ├── Grafana.md
│   │   ├── Zabbix.md
│   │   ├── Nagios.md
│   │   ├── Netdata.md
│   │   ├── Telegraf.md
│   │   └── Uptime Kuma.md
│   ├── Трассировка и debug/
│   │   ├── strace.md
│   │   ├── ltrace.md
│   │   ├── gdb.md
│   │   ├── coredumpctl.md
│   │   ├── perf.md
│   │   ├── eBPF.md
│   │   ├── bpftrace.md
│   │   └── systemtap.md
│   ├── Диагностика загрузки.md
│   ├── Диагностика дисков.md
│   ├── Диагностика сети.md
│   ├── Диагностика графики.md
│   ├── Диагностика звука.md
│   └── Типовые ошибки и рецепты.md
│
├── 19 Мультимедиа и повседневные приложения/
│   ├── Приложения.md
│   ├── Браузеры/
│   │   ├── Firefox.md
│   │   ├── Chromium.md
│   │   ├── Brave.md
│   │   ├── Tor Browser.md
│   │   └── Browser Hardening.md
│   ├── Офис/
│   │   ├── LibreOffice.md
│   │   ├── OnlyOffice.md
│   │   ├── PDF инструменты.md
│   │   └── OCR.md
│   ├── Мультимедиа/
│   │   ├── FFmpeg.md
│   │   ├── VLC.md
│   │   ├── MPV.md
│   │   ├── PipeWire.md
│   │   ├── GIMP.md
│   │   ├── Krita.md
│   │   ├── Blender.md
│   │   ├── Kdenlive.md
│   │   ├── Audacity.md
│   │   └── OBS Studio.md
│   ├── Мессенджеры/
│   │   ├── Discord.md
│   │   ├── Telegram.md
│   │   ├── Signal.md
│   │   ├── Slack.md
│   │   └── Element.md
│   ├── Облака и синхронизация/
│   │   ├── Syncthing.md
│   │   ├── Nextcloud.md
│   │   ├── rclone.md
│   │   ├── Dropbox.md
│   │   └── Google Drive.md
│   └── Торренты.md
│
├── 20 Игры/
│   ├── Игры на Linux.md
│   ├── Steam.md
│   ├── Steam Play и Proton.md
│   ├── Proton GE.md
│   ├── Wine.md
│   ├── Winetricks.md
│   ├── Lutris.md
│   ├── Heroic Games Launcher.md
│   ├── Bottles.md
│   ├── Gamescope.md
│   ├── MangoHud.md
│   ├── GameMode.md
│   ├── Anti Cheat.md
│   ├── NVIDIA для игр.md
│   ├── AMD для игр.md
│   ├── Контроллеры.md
│   ├── Эмуляторы.md
│   └── Оптимизация игр.md
│
├── 21 Специализированные платформы/
│   ├── Специализированные платформы.md
│   ├── WSL/
│   │   ├── WSL.md
│   │   ├── WSL1 и WSL2.md
│   │   ├── systemd в WSL.md
│   │   ├── WSLg.md
│   │   ├── Интеграция с Windows.md
│   │   └── Troubleshooting WSL.md
│   ├── ARM и SBC/
│   │   ├── ARM.md
│   │   ├── Raspberry Pi.md
│   │   ├── Orange Pi.md
│   │   ├── Rockchip.md
│   │   ├── GPIO.md
│   │   └── Headless Setup.md
│   ├── Embedded Linux/
│   │   ├── Buildroot.md
│   │   ├── Yocto.md
│   │   ├── OpenWrt.md
│   │   └── BusyBox.md
│   ├── Router и NAS.md
│   ├── Chromebook и Crostini.md
│   └── Android и Termux.md
│
├── 22 Автоматизация и рецепты/
│   ├── Автоматизация и рецепты.md
│   ├── Shell Скрипты.md
│   ├── Python автоматизация.md
│   ├── Ansible Playbooks.md
│   ├── Cron Tasks.md
│   ├── Systemd Services и Timers.md
│   ├── udev автоматизация.md
│   ├── Резервное копирование скрипты.md
│   ├── Обслуживание системы.md
│   ├── Первичная настройка.md
│   ├── Миграция на новую систему.md
│   ├── Emergency Commands.md
│   └── Личные рецепты/
│       ├── Сеть.md
│       ├── Диски.md
│       ├── Загрузка.md
│       ├── Пакеты.md
│       ├── Графика.md
│       ├── Звук.md
│       ├── Безопасность.md
│       └── Разное.md
│
├── 23 Дотфайлы и конфигурации/
│   ├── Dotfiles.md
│   ├── Управление конфигурациями.md
│   ├── GNU Stow.md
│   ├── Chezmoi.md
│   ├── YADM.md
│   ├── Bare Git Repository.md
│   ├── Конфигурации/
│   │   ├── .bashrc.md
│   │   ├── .zshrc.md
│   │   ├── .profile.md
│   │   ├── .gitconfig.md
│   │   ├── .ssh config.md
│   │   ├── .vimrc.md
│   │   ├── .config/
│   │   │   ├── systemd/
│   │   │   ├── nvim/
│   │   │   ├── tmux/
│   │   │   ├── i3/
│   │   │   ├── sway/
│   │   │   ├── hypr/
│   │   │   ├── waybar/
│   │   │   ├── dunst/
│   │   │   ├── pipewire/
│   │   │   └── user dirs.dirs.md
│   │   └── /etc/
│   │       ├── fstab.md
│   │       ├── hosts.md
│   │       ├── locale.conf.md
│   │       ├── environment.md
│   │       ├── sudoers.md
│   │       ├── ssh/
│   │       ├── systemd/
│   │       ├── NetworkManager/
│   │       └── pacman.conf.md
│   └── Secrets Management.md
│
└── 99 Черновики и входящие/
    ├── Inbox.md
    ├── Идеи.md
    ├── Неразобранное.md
    ├── Временные заметки.md
    ├── Ссылки на разбор.md
    ├── Термины на уточнение.md
    └── Архив/
        ├── Устаревшее.md
        ├── Перенесено.md
        └── История изменений.md
