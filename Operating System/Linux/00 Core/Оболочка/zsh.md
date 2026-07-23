Первая версия [ZSH](https://www.zsh.org/) была написана Паулем Фалстадом, когда он был студентом Принстонского университета в 1990 году. Название оболочки произошло от учетной записи "zsh" университетского ассистента Пауля по имени Чжун Шао. В настоящее время проект развивается энтузиастами под руководством Питера Стефенсона в рамках свободно распространяемого ПО.  

ZSH является расширенным аналогом BASH и имеет с ним обратную совместимость, добавляя ему большое количество улучшений.

**Ключевые особенности ZSH:**

1. Встроенное автозаполнение с расширенным функционалом. Клавиша TAB **⇆** используется для автоматического дополнения (завершения) любой команды, которую вы хотите запустить. Помимо автозаполнения она выводит раскрывающийся список всех возможных файлов и каталогов
2. Поддерживает встроенные выражения с подстановочными знаками (**,** **?**, **[]**)
3. Более настраиваемый, чем `BASH`
4. Поддерживает различные плагины, расширяющие функционал и темы для кастомизации внешнего вида.
5. [Oh My Zsh](https://ohmyz.sh/) — наиболее известный фреймворк для применения разнообразных настроек оболочки  
6. Пользовательские параметры конфигурации находятся в домашнем разделе в файле `/home/.zshrc`

### zsh setup

```bash
# install zsh
sudo apt-get install zsh

# install oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# install zsh into shell
chsh -s /bin/zsh ${USER}
chsh -s $(which zsh)

# info
zsh --version
echo $SHELL
```

### zsh theme

```bash
git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1

ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

### zsh plugins

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search

git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions
```

### zsh addons

```bash
# ni - use the right package manager
npm i -g @antfu/ni
```

## Источники
- #### [pingvinus](https://pingvinus.ru/note/bash-fish-zsh)
