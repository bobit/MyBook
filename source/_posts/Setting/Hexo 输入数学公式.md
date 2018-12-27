---
title: Hexo 输入数学公式
tags:
  - Hexo
categories:
  - Tools
toc: true
mathjax: true
abbrlink: 79274bb6
date: 2015-11-13 11:14:35
---

Hexo 输入数学公式主要通过MathJax 渲染LaTeX 公式实现的，具体开启步骤以及简要语法介绍如下。

## 安装配置

在next 主题配置文件_config.yaml 中找到 MathJax 选项，将enable 改成 true 即可：

```
MathJax Support
mathjax:
    enable: true
    per_page: false
    cdn: //cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML
```

页面插入

页面插入公式有两种形式，一是行内插入公式不居中显示：

```
$公式$
```

例如 $E=mc^2$

第二种是行间插入公式，居中显示：

```
$$公式$$
```

例如： $S=\pi*r^2$

## 语法公式

关于公式的语法格式，主要有以下常用：

### 上下标

^ 表示上标，_ 表示下标。

```
$$a_{1} x^{2} $$
$$e^{-\alpha t} $$
$$a^{i}_{ij}$$
$$e^{x^2} \neq {e^x}^2$$
```

$$a_{1}$$
$$x^{2}$$
$$e^{-\alpha t}$$
$$a^{i}_{ij}$$
$$e{x2} \neq {ex}2$$

此外，如果左右两边都有上下标，则使用 \sideset 命令，效果如下：

```
\sideset{^xy}{^xy}\bigotimes
```

$$\sideset{xy}{xy}\bigotimes$$

### 平方根

平方根输入命令为 \sqrt，n次方根命令为 \sqrt[n]，其符号大小由LaTeX 自动给定：

```
$$\sqrt{x}$$ $$\sqrt{x^2+\sqrt{y}$$ $$\sqrt[3]{2}$$
```

$$\sqrt{x}$$
$$ \sqrt{x^2+\sqrt{y}}$$
$$\sqrt[3]{2}$$

### 水平线

使用 \overline 和 \underline 分别在表达式上下方画出水平线：

```
$$\overline{m + n}$$
$$\underline{m + n}$$
```

$$\overline{m + n}$$
$$\underline{m + n}$$

### 水平大括号

命令 \overbrace 和 \underrace，效果如下：

```
$$\underbrace{a+b+\cdots+z}$$
$$\overbrace{a+b+\cdots+z}$$
```

$$\overbrace{a+b+\cdots+z}$$

$$\underbrace{a+b+\cdots+z}$$

### 矢量

矢量的命令是 \vec，用于单个字母的向量表示。\overrightarrow 和\overleftarrow 分别表示向右和向左的向量箭头：

```
$$\vec{a}$$
$$\overrightarrow{AB}$$
$$\overleftarrow{BA}$$
```

$$\vec{a}$$
$$\overrightarrow{AB}$$
$$\overleftarrow{BA}$$

### 分数

分数使用 \frac{...}{...} 进行排版：

```
$$1\frac{1}{2}$$
$$\frac{x^2}{k+1}$$
$$x^{1/2}$$
```

$$1\frac{1}{2}$$
$$\frac{x^2}{k+1}$$
$$x^{1/2}$$

### 积分运算符

积分运算符使用 \int 生成。求和运算符使用 \sum 生成。乘积运算符使用 \prod 生成。上下限使用^ 和_ 命令，类似 上下标：

```
$$\sum_{i=1}^{n}$$
$$\int_{0}^{\frac{\pi}{2}}$$
$$\prod_\epsilon$$
```

$$\sum_{i=1}^{n}$$
$$\int_{0}^{\frac{\pi}{2}}$$
$$\prod_\epsilon$$

### 希腊字母

$\alpha$  \alpha  $\beta$ \beta  $\gamma$  \gamma  $\delta$  \delta  $\epsilon$  \epsilon

### 字体转换

要对公式的某一部分字符进行字体转换，可以用{\rm需转换的部分字符}命令，其中\rm可以参照下表选择合适的字体。
 一般情况下，公式默认为意大利体。

```
\rm 罗马体 \rm test \it 意大利体 \it test
\bf 黑体 \bf test \cal 花体 \cal test
\sl 倾斜体 \sl test \sf 等线体 \sf test
\mit 数学斜体 \mit test \tt 打字机字体 \tt test
\sc 小体大写字母 \sc test
```

