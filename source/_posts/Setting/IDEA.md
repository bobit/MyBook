---
title: IDEA使用方法详解
toc: true
typora-copy-images-to: ../../../gitbooks/static/images/5dcde84c
abbrlink: 5dcde84c
date: 2015-11-12 11:15:35
tags:
  - IDEA
categories:
  - Tools
---

## IntelliJ IDEA import and reimport a project
以下是import一个Maven project的时候需要进行的配置：
(1)Keep projects files in: 
通过这一个check box来指定“项目文件”在导入之后的location。
比如说，当你import一个project并希望将“.iml”文件和“.idea”文件夹导入到指定的文件夹中，而不是默认的位置。
默认地，IntellJ IDEA会将“项目文件”放在pom.xml的旁边。

(2)Import Maven projects automatically：
选择该项，如果你想要每次你修改你的pom.xml文件时，IntelliJ IDEA都会自动执行reimport。

(3)Create IntelliJ IDEA modules for aggregator projects (with 'pom' packaging)：
选择该项，在该“aggressive project”的pom.xml中的包含的每一个Maven Modules将会被创建。

(4)Create module groups for multi-module Maven projects:
选择该项，IntelliJ IDEA将会根据该aggressive Maven project创建一个module group，包含每个nested modules。

(5)Keep source and test folders on reimport：
1.选择该项,所有的“source”和“test”文件夹将会在每次import时被保存。
2.不选该项,所有之前配置的“source”和“test”文件夹将会在每次import的时候被remove掉。
默认地，该check box如下设置的：
1.对于new project：不选该项；
2.对于already imported projects：选择该项。

(6)Exclude build directory (PROJECT_ROOT/target):
选择该项，来从该项目中排出build目录。
这个可能会有用，如果你想要加速项目导入的进程。
不选该项，IntelliJ IDEA在每次你import一个project的时候，将会在build目录下的文件建立索引，这样的话有可能会有额外的时间开销。

(7)Use Maven output directories：
不选该项，build将会被创建在IntelliJ IDEA的默认output目录：USER_HOME\IdeaProjects\<project>\classes\Production\；
选择该项，build被创建在Mavende output目录，而且，IntelliJ IDEA编译的结果被reused。
但是，IntelliJ IDEA本身不会reuse Maven build的结果，and，会重头编译。

(8)Generated sources folders:
当你reimport一个project的时候，指定你的source root的directory。
你可以选择这下面的一种选项：
1.Detect automatically： 这是默认选项。IntelliJ IDEA将自动的识别产生sources的位置。
IntelliJ IDEA也会识别标记为source root的路径。但是，IntelliJ IDEA只在target/generated-sources和target/generated-sources/*下搜索。
2.target/generated-sources：这个选项让你手动的标记source root。
3.subdirectories of "target/generated-sources"：这个选项让你手动的标记subdirectory为source root。
4.Don't detect：这个选项让你跳过detection process。

(9)Phase to be used for folders update：
选择用来folder updat的Maven phase。这可能有用，如果你调整你的plugins，为了使额外的sources在某些阶段被load进来。

(10)Automatically download：
选择source、documenation，在一个opening Maven project中，这些将会被自动下载。

(11)Dependency types：
使用这个field来指定，当你reimport project时候的dependency types。

(12)Use Maven3 to import a project:

## Q2A
### terminal设置成Linux的终端一样
1. setting->Tools->terminal->你的路径\Git\bin\bash.exe
2. 解决IDEA下的terminal中文Unicode编码问题，在Git的安装目录下的etc目录下bash.bashrc文件，在最后一行添加：
    ```
    export LC_ALL=zh_CN.UTF-8 # 设置终端打开的编码
    alias ls='ls -F --color=auto --show-control-chars' # 使用ls命令的时候加上颜色
    alias ll='ls -la -F --color=auto --show-control-chars' # 使用ll命令的时候加上颜色
    ```
3. 重启IDEA就可以了。 

### can't start git:git.exe
Settings -- Version Control -- Git 
Path to Git executable:C:\DevTools\PortableGit\bin\git.exe

### IntelliJ IDEA怎么删除Module
idea,删除(实际上是移除)module之后,如何重新添加
idea，里面的删除，不是真的删除，只是移除，如果想要重新添加，操作过程ctrl+alt+shift+s,进入project structure，然后点击Modules，点击+号，选择import module，然后找到对应的module所在位置，添加进来。
此外还有一种简单的方式，但是忘记了，后面如果想起来再做补充

### out存放的是该项目下所有Module(模块)的编译结果。 
target存放的是单个Module的编译结果。 
如果为某个Module指定了编译结果的路径，则不会再输出到out文件夹中了。
你在Project Structure中的Project选项卡中可以设置Project compiler output的目录。 
在Modules中选择某一个模块后，在右侧的Paths选项卡中可以设置该模块的Compiler output目录。

### Move Module to Group分组重启丢失
  解决：
  Settings - Build,Execution,Deployment -- Build Tools - Maven - Importing
  Create module groups for multi-module Maven projects 取消此项
  Create module groups for multi-module Maven projects 选中无法创建分组的，显示多个模块项目。
  Create IntelliJ IDEA modules for aggregator projects(with 'pom' packaging) 会移除父模块
  上述两个都选中显示分组，分组下显示多个模块

### IDEA工具将所有的class打包成jar文件，方法如下：
1. 选择菜单File->Project Structure，将弹出Project Structure的设置对话框。
2. 选择左边的Artifacts后点击上方的“+”按钮点击“+”，选择“Jar”，选择Empty或From modules with dependencies，后者会把在项目中用到的Jar包解压开，当成项目的一部分，打包到最后的Jar包中。但是这样会有一个问题，即，如果项目中引用的Jar包有签名过，最后打包成的Jar包运行时会抛出错误：
“java.lang.SecurityException: Invalid signature file digest for Manifest main attributes”，因此，选择的是Empty，然后在“Output Layout”中，把自己要打包的文件、文件夹添加进去。对于外部引用的包，全部放在lib目录下，因此，在Class Path中，把依赖的jar包添加进去，例如：lib/javax.servlet-3.0.0.v201112011016.jar lib/jetty-all-9.1.5.v20140505.jar lib/json-simple-1.1.1.jar
设置好Main Class，这就不用多说了。点击OK。
回到IDEA，选择Build -> Build Artifacts，成功生成Jar包。生成的Jar包位于上图设置的Output directory。
使用命令java -jar xxxxx.jar来执行jar包。
3. 在弹出的框中选择jar->from moduls with dependencies..
4. 选择要启动的类，然后 确定
5. 应用之后选择菜单Build->Build Artifacts,选择Build或者Rebuild后即可生成，生成的jar文件位于工程项目目录的out/artifacts下。

### IDEA工具指定jdk的Language level
在Java项目中必不可少的是我们要指定一个jdk。在指定jdk的同时，还可以指定jdk的Language level，这个有点像我们工程最低支持版本。比如Language level 设置了5.0 只是就不能出现使用6.0／7.0特性的代码。
因为这些特性在5.0的环境下是无法编译的。或者可以理解ide会安装Language level指定的jdk版本来对我们的代码进行编译，以及错误检查。
在IntelliJ中有两个地方设置这个参数。
1. 针对整个工程，或者说是工程默认的。
2. 针对模块的，这里才是正在生效的设置。
如果设置Use project language level 就是延用project的设置。
此处可以重新指定。project设置就失效。这个设置需要重新载入项目。