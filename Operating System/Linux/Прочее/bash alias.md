```bash
# -------------------------------- #
# Node Package Manager
# -------------------------------- #
# https://github.com/antfu/ni

alias nio="ni --prefer-offline"
alias ni="ni"
alias s="nr start"
alias d="nr dev"
alias b="nr build"
alias bw="nr build --watch"
alias t="nr test"
alias tu="nr test -u"
alias tw="nr test --watch"
alias w="nr watch"
alias p="nr play"
alias c="nr typecheck"
alias lint="nr lint"
alias lintf="nr lint --fix"
alias release="nr release"
alias re="nr release"

# -------------------------------- #
# Git
# -------------------------------- #

# Go to project root
alias grt='cd "$(git rev-parse --show-toplevel)"'

alias gs='git status'
alias gp='git push'
alias gpf='git push --force'
alias gpft='git push --follow-tags'
alias gpl='git pull --rebase'
alias gcl='git clone'
alias gst='git stash'
alias grm='git rm'
alias gmv='git mv'

alias main='git checkout main'

alias gco='git checkout'
alias gcob='git checkout -b'

alias gb='git branch'
alias gbd='git branch -d'

alias grb='git rebase'
alias grbom='git rebase origin/master'
alias grbc='git rebase --continue'

alias gl='git log'
alias glo='git log --oneline --graph'

alias grh='git reset HEAD'
alias grh1='git reset HEAD~1'

alias ga='git add'
alias gA='git add -A'

alias gc='git commit'
alias gcm='git commit -m'
alias gca='git commit -a'
alias gcam='git add -A && git commit -m'
alias gfrb='git fetch origin && git rebase origin/master'

alias gxn='git clean -dn'
alias gx='git clean -df'

alias gsha='git rev-parse HEAD | pbcopy'

alias ghci='gh run list -L 1'

alias rmn="find . -type d -name 'node_modules' -exec rm -rf {} +"
alias gs='git switch'
```

```bash
# -------------------------------- #  
# Directories  
#  
# I put  
# `~/m` for my projects  
# `~/w` for wors  
# -------------------------------- #  
  
function m() {  
 cd ~/my/$1  
}  
  
function w() {  
 cd ~/work/$1  
}  
  
function pr() {  
 if [ $1 = "ls" ]; then  
   gh pr list  
 else  
   gh pr checkout $1  
 fi  
}  
  
function dir() {  
 mkdir $1 && cd $1  
}  
  
function clone() {  
 if [[ -z $2 ]] then  
   git clone "$@" && cd "$(basename "$1" .git)"  
 else  
   git clone "$@" && cd "$2"  
 fi  
}  
  
# Clone to ~/m and cd to it  
function clonem() {  
 m && clone "$@" && code . && cd ~2  
}  
  
function clonew() {  
 w && clone "$@" && code . && cd ~2  
}  
  
function codem() {  
 m && code "$@" && cd -  
}
```