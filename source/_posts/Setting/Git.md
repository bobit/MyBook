---
title: Git使用方法详解
tags:
  - Git
categories:
  - Tools
toc: true
typora-copy-images-to: ../../../gitbooks/static/images/695dd287
abbrlink: 695dd287
---



## 参考

https://help.github.com/en/articles/removing-sensitive-data-from-a-repository

## 管理工具

https://git-scm.com/download/gui/windows

### git-scm

https://gitforwindows.org/

### TortoiseGit

### GitHub Desktop

### SmartGit

## 命令

**查看、添加、提交、删除、找回，重置修改文件**

```
git help <command> # 显示command的help  

git show # 显示某次提交的内容 git show $id  

git co -- <file> # 抛弃工作区修改  

git co . # 抛弃工作区修改  

git add <file> # 将工作文件修改提交到本地暂存区  

git add . # 将所有修改过的工作文件提交暂存区  

git rm <file> # 从版本库中删除文件  

git rm <file> --cached # 从版本库中删除文件，但不删除文件  

git reset <file> # 从暂存区恢复到工作文件  

git reset -- . # 从暂存区恢复到工作文件  

git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改  

git ci <file> git ci . git ci -a # 将git add, git rm和git ci等操作都合并在一起做　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　git ci -am "some comments"  

git ci --amend # 修改最后一次提交记录  

git revert <$id> # 恢复某次提交的状态，恢复动作本身也创建次提交对象  

git revert HEAD # 恢复最后一次提交的状态  1234567891011121314151617181920212223242526272829
```

查看文件diff

```
git help <command> # 显示command的help  

git show # 显示某次提交的内容 git show $id  

git co -- <file> # 抛弃工作区修改  

git co . # 抛弃工作区修改  

git add <file> # 将工作文件修改提交到本地暂存区  

git add . # 将所有修改过的工作文件提交暂存区  

git rm <file> # 从版本库中删除文件  

git rm <file> --cached # 从版本库中删除文件，但不删除文件  

git reset <file> # 从暂存区恢复到工作文件  

git reset -- . # 从暂存区恢复到工作文件  

git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改  

git ci <file> git ci . git ci -a # 将git add, git rm和git ci等操作都合并在一起做　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　git ci -am "some comments"  

git ci --amend # 修改最后一次提交记录  

git revert <$id> # 恢复某次提交的状态，恢复动作本身也创建次提交对象  

git revert HEAD # 恢复最后一次提交的状态  1234567891011121314151617181920212223242526272829
```

查看提交记录

```
git log git log <file> # 查看该文件每次提交记录  

git log -p <file> # 查看每次详细修改内容的diff  

git log -p -2 # 查看最近两次详细修改内容的diff  

git log --stat #查看提交统计信息  

tig

Mac上可以使用tig代替diff和log，brew install tig1234567891011
```

Git 本地分支管理 
查看、切换、创建和删除分支

```
git br -r # 查看远程分支  

git br <new_branch> # 创建新的分支  

git br -v # 查看各个分支最后提交信息  

git br --merged # 查看已经被合并到当前分支的分支  

git br --no-merged # 查看尚未被合并到当前分支的分支  

git co <branch> # 切换到某个分支  

git co -b <new_branch> # 创建新的分支，并且切换过去  

git co -b <new_branch> <branch> # 基于branch创建新的new_branch  

git co $id # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除  

git co $id -b <new_branch> # 把某次历史提交记录checkout出来，创建成一个分支  

git br -d <branch> # 删除某个分支  

git br -D <branch> # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)  1234567891011121314151617181920212223
```

分支合并和reba

```
git merge <branch> # 将branch分支合并到当前分支  

git merge origin/master --no-ff # 不要Fast-Foward合并，这样可以生成merge提交  

git rebase master <branch> # 将master rebase到branch，相当于： git co <branch> && git rebase master && git co master && git merge <branch>  12345
```

Git补丁管理(方便在多台机器上开发同步时用)

```
git merge <branch> # 将branch分支合并到当前分支  

git merge origin/master --no-ff # 不要Fast-Foward合并，这样可以生成merge提交  

git rebase master <branch> # 将master rebase到branch，相当于： git co <branch> && git rebase master && git co master && git merge <branch>  12345
```

Git暂存管

```
git stash # 暂存  

git stash list # 列所有stash  

git stash apply # 恢复暂存的内容  

git stash drop # 删除暂存区  
12345678
```

Git远程分支管理

```
git pull # 抓取远程仓库所有分支更新并合并到本地  

git pull --no-ff # 抓取远程仓库所有分支更新并合并到本地，不要快进合并  

git fetch origin # 抓取远程仓库更新  

git merge origin/master # 将远程主分支合并到本地当前分支  

git co --track origin/branch # 跟踪某个远程分支创建相应的本地分支  

git co -b <local_branch> origin/<remote_branch> # 基于远程分支创建本地分支，功能同上  1234567891011
```

git push # push所有分支

```
git push origin master # 将本地主分支推到远程主分支  

git push -u origin master # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)  

git push origin <local_branch> # 创建远程分支， origin是远程仓库名  

git push origin <local_branch>:<remote_branch> # 创建远程分支  

git push origin :<remote_branch> #先删除本地分支(git br -d <branch>)，然后再push删除远程分支  123456789
```

Git远程仓库管

```
git remote -v # 查看远程服务器地址和仓库名称  

git remote show origin # 查看远程服务器仓库状态  

git remote add origin git@ github:robbin/robbin_site.git # 添加远程仓库地址  

git remote set-url origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址) git remote rm <repository> # 删除远程仓库 1234567
```

创建远程仓库

```
git clone --bare robbin_site robbin_site.git # 用带版本的项目创建纯版本仓库  

scp -r my_project.git git@ git.csdn.net:~ # 将纯仓库上传到服务器上  

mkdir robbin_site.git && cd robbin_site.git && git --bare init # 在服务器创建纯仓库  

git remote add origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址  

git push -u origin master # 客户端首次提交  

git push -u origin develop # 首次将本地develop分支提交到远程develop分支，并且track  

git remote set-head origin master # 设置远程仓库的HEAD指向master分支 12345678910111213
```

也可以命令设置跟踪远程库和本地库

```
git branch --set-upstream master origin/master  

git branch --set-upstream develop origin/develop  
```

## 常用

```
git status 查看未被传送到远程代码库的提交状态
git add .  #把修改的文件添加至暂存区
git commit -m “说明文字”  #在本地将暂存区内容提交
git push -u origin master  #将本地推送到远端
git fetch origin master
git pull origin master  #从远程库拉回版本

git pull = git fetch + git merge

git cherry -v 查看未被传送到远程代码库的提交描述和说明
git reset commit_id 撤销未被传送到远程代码库的提交
```

## 初始化

```
git init 初始化仓库,新建一个Git仓库(新建了一个隐藏目录.git)
　　
把远程仓库克隆到本地
git clone git@github.com:lioilwin/lioilwin.github.io.git
git clone git@git.coding.net:lifec/lioilwin.git

把本地仓库关联到远程仓库
git remote add github git@github.com:lioilwin/lioilwin.github.io.git
git remote add coding git@git.coding.net:lifec/lioilwin.git

远程仓库别名
如果git clone一个远程仓库, Git会自动添加url,别名为origin
git remote      列出远程仓库别名    
git remote -v   远程仓库别名对应的实际url
git remote add [alias] [url]   添加一个新远程仓库
git remote rm [alias]          删除远程仓库别名
git remote rename [old-alias] [new-alias]   重命名
git remote set-url [alias] [url]   更改url,可以加上—push和fetch参数,为同一个别名set不同地址
```

## 日志/回滚重置

```
git log --name-only --oneline fileName
git log --oneline --number  每条log只显示一行,显示number条
git log --oneline --graph   图形化显示分支合并历史
git log branchname          显示特定分支
git log --decorate
git log --author=[author name] 指定作者的提交历史.
git log --since --before --until --after  根据提交时间筛选
git log --grep 根据commit信息过滤
git log --stat 改动信息     
    
git reflog
    reflog记录分支变化或者HEAD引用变化, 当git reflog不指定引用时, 默认列出HEAD的reflog,
    HEAD@{0}代表HEAD当前的值, HEAD@{3}代表HEAD在3次变化之前的值,
    git会将变化记录到HEAD对应的reflog文件中, 其路径为.git/logs/HEAD, 分支reflog文件都放在.git/logs/refs的子目录

git show commitID
git diff
    不加参数: show diff of unstaged changes.

    git diff --cached 命令
        已经暂存的文件和上次提交之间的差异
        
    git diff HEAD
        show diff of all staged or unstated changes.
        
git checkout commitID fileName
git revert
git reset --hard

git分为三个区域: 
    1.工作区(working directry)
    2.暂缓区(stage index)   
    3.历史记录区(history)
    
git reset --mixed id  history变了(提交记录变了),但staged 和 working没变  (默认方式)
git reset --soft id   history变了(提交记录变了)和staged区都变了,但working没变
git reset --hard id   全都变了

变化范围:
soft (history) < mixed (history + stage) < hard (history + stage + working)
```

## 分支

```
git branch -v  每一个分支的最后一次提交.
git branch     列出本地所有分支,当前分支会被星号标示出 
git branch mybranch        创建分支
git branch -D mybranch     删除分支 

git checkout mybranch      切换分支
git checkout -b mybranch   创建并切换分支
git rebase master          把master分支更新到当前分支
git merge mybranch         分支合并

git push [remote-name] :branch-name 删除远程分支
```

## 彻底清除垃圾文件(缩减git仓库)

```

# 清除垃圾文件(pdf)
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch *.pdf' --prune-empty --tag-name-filter cat -- --all

# 提交到远程仓库(如GitHub, 我再次从git clone GitHub代码库会变小为1.3M)
git push origin --force --all

# 必须回收垃圾,本地仓库才变小
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin    
git reflog expire --expire=now --all
git gc --prune=now

rm -rf .git/refs/original
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
```

