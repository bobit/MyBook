---
title: Git使用方法详解
toc: true
abbrlink: 695dd287
typora-copy-images-to: ../../gitbooks/static/images/695dd287
tags:
  - Git
categories:
  - DevOps
---

## Git

# FAQ

# git如何撤销上一次commit操作

### 第一种情况：还没有push，只是在本地commit

```
git reset --soft|--mixed|--hard <commit_id>

git push develop develop --force  (本地分支和远程分支都是 develop)
```

这里的&lt;commit\_id&gt;就是每次commit的SHA-1，可以在log里查看到

--mixed    会保留源码,只是将git commit和index 信息回退到了某个版本.  
--soft   保留源码,只回退到commit信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即可.  
--hard    源码也会回退到某个版本,commit和index 都会回退到某个版本.\(注意,这种方式是改变本地代码仓库源码\)

当然有人在push代码以后,也使用 reset --hard &lt;commit...&gt; 回退代码到某个版本之前,但是这样会有一个问题,你线上的代码没有变,线上commit,index都没有变,当你把本地代码修改完提交的时候你会发现全是冲突.....这时换下一种

### 第二种情况：commit push 代码已经更新到远程仓库

对于已经把代码push到线上仓库,你回退本地代码其实也想同时回退线上代码,回滚到某个指定的版本,线上,线下代码保持一致.你要用到下面的命令

```
git revert <commit_id>
```

revert 之后你的本地代码会回滚到指定的历史版本,这时你再 git push 既可以把线上的代码更新。

注意：git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit，看似达到的效果是一样的,其实完全不同。

第一:上面我们说的如果你已经push到线上代码库, reset 删除指定commit以后,你git push可能导致一大堆冲突.但是revert 并不会.  
第二:如果在日后现有分支和历史分支需要合并的时候,reset 恢复部分的代码依然会出现在历史分支里.但是revert 方向提交的commit 并不会出现在历史分支里.  
第三:reset 是在正常的commit历史中,删除了指定的commit,这时 HEAD 是向后移动了,而 revert 是在正常的commit历史中再commit一次,只不过是反向提交,他的 HEAD 是一直向前的.

