
### Step 1: Boot from a Live USB

First, you need to boot from a live Linux USB. Then, open a Terminal window.

### Step 2: Identify Root Partition and EFI Partition

Run the following command to determine the current `root` and `EFI` partitions:

```bash
lsblk -io KNAME,MOUNTPOINT | grep "/"
```

![[./_/mount-partition-1.png]]

We’ll now create shell variables to denote the `root` and `EFI` partitions:

> [!WARN] Caution
> Make sure to set the variables `$ROOT_PART` and `$EFI_PART` with the proper partition names you obtained above! Also, don't forget to add `/dev/` in front of the partition name as shown below:

Make sure to set the variables `$ROOT_PART` and `$EFI_PART` with the proper partition names you obtained above! Also, don't forget to add `/dev/` in front of the partition name as shown below:

```bash
export ROOT_PART="/dev/nvme0n1p5"
export EFI_PART="/dev/nvme0n1p1"
```

### Step 3: Mount Root Partition and EFI Partition

Next, mount these partitions and set proper permissions:

```bash
sudo mount $ROOT_PART /mnt
sudo mount $EFI_PART /mnt/boot/efi
```

```bash
sudo mount -o bind /dev /mnt/dev
sudo mount -o bind /proc /mnt/proc
sudo mount -o bind /sys /mnt/sys
sudo mount -o bind /run /mnt/run
sudo chroot /mnt/
```

### Step 4: Fix GRUB Installation

Once the proper partitions have been mounted, run the appropriate commands below depending on your Linux distro.

1. Ubuntu and Debian derivatives (For UEFI or Non-UEFI):

```bash
sudo apt-get install --reinstall grub-efi
sudo update-grub
```

2. Manjaro and Arch Linux derivatives (For UEFI):

```bash
sudo pacman -S grub efibootmgr os-prober
sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=grub
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

3. Manjaro and Arch Linux derivatives (For Non-UEFI):

```bash
sudo pacman -S grub
sudo grub-install --recheck --target=i386-pc $ROOT_PART
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

### Step 5: Reboot

Finally, restart your computer and you should be good to boot on Linux again :)

```bash
sudo reboot
```

---

## Источники
- #### [blog](https://techblog.dev/posts/2021/12/how-to-fix-missing-grub-boot-menu-after-a-windows-update/)
