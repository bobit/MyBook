---
title: Groovy基础
tags:
  - Gradle
categories:
  - Tools
toc: true
abbrlink: b88033e6
date: 2015-11-13 11:12:35
---

Groovy

Groovy 是用于Java虚拟机的一种敏捷的动态语言，它是一种成熟的面向对象编程语言，即可以用于面向对象编程，又可以用作纯粹的脚本语言。 使用该种语言不必编写过多的代码，同时又具有闭包和动态语言中的其他特性

## Groovy 特点

动态语言:运行时检查数据的类型
基于JVM
扩展JDK: 对JDK中的类型进行扩展，封装方法调用简化开发
元编程： 注入、拦截、合并、委托方法、操作编译运行行为

## 高效的Groovy特性

assert语句
可选类型定义
可选的括号
字符串

## Groovy 与java对比

- Groovy 完全兼容Java的语法
- 分号是可选的
- 类、方法默认是public的
- == 等同于equals(),不会有NullPointerExceptions异常

```
// 可选类型定义
def version = 1

// assert
assert version == 2

// 可选的括号
println(version)
println version

//字符串
def s1 = 'ctoedu'
def s2 = "version is ${version}"
def s3 = ''' project
name
is
ctoedu
'''

// 集合api
//list
def buildTools=['ant','maven']
buildTools << 'gradle'
assert buildTools.getClass() == ArrayList
assert buildTools.size() == 3

//map

def buildYears = ['ant':2000, 'maven':2004]
buildYears.gradle = 2009

println buildYears.ant
println buildYears['gradle']
println buildYears.getClass()
```

## 在Groovy中，很多东西都是可以省略的

- 语句后面的分号是可以省略的
- 变量的类型和方法的返回值也是可以省略的
- 方法调用时，括号也是可以省略的
- 甚至语句中的return都是可以省略的

在Groovy中，类型是弱化的，所有的类型都可以动态推断，但是Groovy仍然是强类型的语言，类型不匹配仍然会报错；


## Groovy的数据类型

在Groovy中，数据类型有：

- Java中的基本数据类型

- Java中的对象
- Closure（闭包）
- 加强的List、Map等集合类型
- 加强的File、Stream等IO类型

类型可以显示声明，也可以用 def 来声明，用 def 声明的类型Groovy将会进行类型推断。

基本数据类型和对象这里不再多说，和Java中的一致，只不过在Gradle中，对象默认的修饰符为public。下面主要说下String、闭包、集合和IO等。

### String

String的特色在于字符串的拼接，比如

def a = 1
def b = "hello"
def c = "a=${a}, b=${b}"
println c

outputs:
a=1, b=hello
### 闭包

Groovy中有一种特殊的类型，叫做Closure，翻译过来就是闭包，这是一种类似于C语言中函数指针的东西。闭包用起来非常方便，在Groovy中，闭包作为一种特殊的数据类型而存在，闭包可以作为方法的参数和返回值，也可以作为一个变量而存在。

如何声明闭包？

{ parameters ->
   code
}
闭包可以有返回值和参数，当然也可以没有。下面是几个具体的例子：

def closure = { int a, String b ->
   println "a=${a}, b=${b}, I am a closure!"
}

// 这里省略了闭包的参数类型
def test = { a, b ->
   println "a=${a}, b=${b}, I am a closure!"
}

def ryg = { a, b ->
   a + b
}

closure(100, "renyugang")
test.call(100, 200)
def c = ryg(100,200)
println c
闭包可以当做函数一样使用，在上面的例子中，将会得到如下输出：

a=100, b=renyugang, I am a closure!
a=100, b=200, I am a closure!
300
另外，如果闭包不指定参数，那么它会有一个隐含的参数 it

// 这里省略了闭包的参数类型
def test = {
   println "find ${it}, I am a closure!"
}
test(100)

outputs:
find 100, I am a closure! 
闭包的一个难题是如何确定闭包的参数，尤其当我们调用Groovy的API时，这个时候没有其他办法，只有查询Groovy的文档：

http://www.groovy-lang.org/api.html

http://docs.groovy-lang.org/latest/html/groovy-jdk/index-all.html

下面会结合具体的例子来说明如何查文档。

### List和Map

Groovy加强了Java中的集合类，比如List、Map、Set等。

List的使用如下：

def emptyList = []

def test = [100, "hello", true]
test[1] = "world"
println test[0]
println test[1]
test << 200
println test.size

outputs:
100
world
4
List还有一种看起来很奇怪的操作符<<，其实这并没有什么大不了，左移位表示向List中添加新元素的意思，这一点从文档当也能查到。



其实Map也有左移操作，这如果不查文档，将会非常费解。

Map的使用如下：

def emptyMap = [:]
def test = ["id":1, "name":"renyugang", "isMale":true]
test["id"] = 2
test.id = 900
println test.id
println test.isMale

outputs:
900
true
可以看到，通过Groovy来操作List和Map显然比Java简单的多。

这里借助Map再讲述下如何确定闭包的参数。比如我们想遍历一个Map，我们想采用Groovy的方式，通过查看文档，发现它有如下两个方法，看起来和遍历有关：



可以发现，这两个each方法的参数都是一个闭包，那么我们如何知道闭包的参数呢？当然不能靠猜，还是要查文档。



通过文档可以发现，这个闭包的参数还是不确定的，如果我们传递的闭包是一个参数，那么它就把entry作为参数；如果我们传递的闭包是2个参数，那么它就把key和value作为参数。

按照这种提示，我们来尝试遍历下：

def emptyMap = [:]
def test = ["id":1, "name":"renyugang", "isMale":true]

test.each { key, value ->
   println "two parameters, find [${key} : ${value}]"
}

test.each {
   println "one parameters, find [${it.key} : ${it.value}]"
}

outputs:
two parameters, find [id : 1]
two parameters, find [name : renyugang]
two parameters, find [isMale : true]

one parameters, find [id : 1]
one parameters, find [name : renyugang]
one parameters, find [isMale : true]
另外一个eachWithIndex方法教给大家练习，自己查文档，然后尝试用这个方法去遍历。

试想一下，如果你不知道查文档，你又怎么知道each方法如何使用呢？光靠从网上搜，API文档中那么多接口，搜的过来吗？记得住吗？

### 加强的IO

在Groovy中，文件访问要比Java简单的多，不管是普通文件还是xml文件。怎么使用呢？还是来查文档。



根据File的eachLine方法，我们可以写出如下遍历代码，可以看到，eachLine方法也是支持1个或2个参数的，这两个参数分别是什么意思，就需要我们学会读文档了，一味地从网上搜例子，多累啊，而且很难彻底掌握：

def file = new File("a.txt")
println "read file using two parameters"
file.eachLine { line, lineNo ->
   println "${lineNo} ${line}"
}

println "read file using one parameters"
file.eachLine { line ->
   println "${line}"
}

outputs:
read file using two parameters
1 欢迎
2 关注
3 玉刚说

read file using one parameters
欢迎
关注
玉刚说
除了eachLine，File还提供了很多Java所没有的方法，大家需要浏览下大概有哪些方法，然后需要用的时候再去查就行了，这就是学习Groovy的正道。

下面我们再来看看访问xml文件，也是比Java中简单多了。
Groovy访问xml有两个类：XmlParser和XmlSlurper，二者几乎一样，在性能上有细微的差别，如果大家感兴趣可以从文档上去了解细节，不过这对于本文不重要。

在下面的链接中找到XmlParser的API文档，参照例子即可编程，

http://docs.groovy-lang.org/docs/latest/html/api/。

假设我们有一个xml，attrs.xml，如下所示：

<resources>
<declare-styleable name="CircleView">

   <attr name="circle_color" format="color">#98ff02</attr>
   <attr name="circle_size" format="integer">100</attr>
   <attr name="circle_title" format="string">renyugang</attr>
</declare-styleable>

</resources>
那么如何遍历它呢？

def xml = new XmlParser().parse(new File("attrs.xml"))
// 访问declare-styleable节点的name属性
println xml['declare-styleable'].@name[0]

// 访问declare-styleable的第三个子节点的内容
println xml['declare-styleable'].attr[2].text()


outputs：
CircleView
renyugang
更多的细节都可以从我发的那个链接中查到，大家有需要查文档即可。

## Groovy的其他特性

除了本文中已经分析的特性外，Groovy还有其他特性。

### Class是一等公民

在Groovy中，所有的Class类型，都可以省略.class，比如：

func(File.class)
func(File)

def func(Class clazz) {
}

### Getter和Setter

在Groovy中，Getter/Setter和属性是默认关联的，比如：

class Book {
   private String name
   String getName() { return name }
   void setName(String name) { this.name = name }
}

class Book {
   String name
}
上述两个类完全一致，只有有属性就有Getter/Setter；同理，只要有Getter/Setter，那么它就有隐含属性。

### with操作符

在Groovy中，当对同一个对象进行操作时，可以使用with，比如：

Book bk = new Book()
bk.id = 1
bk.name = "android art"
bk.press = "china press"

可以简写为：
Book bk = new Book() 
bk.with {
   id = 1
   name = "android art"
   press = "china press"
}

### 判断是否为真

在Groovy中，判断是否为真可以更简洁：

if (name != null && name.length > 0) {}

可以替换为：
if (name) {}

### 简洁的三元表达式

在Groovy中，三元表达式可以更加简洁，比如：

def result = name != null ? name : "Unknown"

// 省略了name
def result = name ?: "Unknown"
简洁的非空判断
在Groovy中，非空判断可以用?表达式，比如：

if (order != null) {
   if (order.getCustomer() != null) {
​       if (order.getCustomer().getAddress() != null) {
​       System.out.println(order.getCustomer().getAddress());
​       }
   }
}

可以简写为：
println order?.customer?.address

### 使用断言

在Groovy中，可以使用assert来设置断言，当断言的条件为false时，程序将会抛出异常：

def check(String name) {
   // name non-null and non-empty according to Gro    ovy Truth
   assert name
   // safe navigation + Groovy Truth to check
   assert name?.size() > 3
}

### switch方法

在Groovy中，switch方法变得更加灵活，可以同时支持更多的参数类型：

def x = 1.23
def result = ""
switch (x) {
   case "foo": result = "found foo"
   // lets fall through
   case "bar": result += "bar"
   case [4, 5, 6, 'inList']: result = "list"
   break
   case 12..30: result = "range"
   break
   case Integer: result = "integer"
   break
   case Number: result = "number"
   break
   case { it > 3 }: result = "number > 3"
   break
   default: result = "default"
}
assert result == "number"

### ==和equals

在Groovy中，==相当于Java的equals，，如果需要比较两个对象是否是同一个，需要使用.is()。

Object a = new Object()
Object b = a.clone()

assert a == b
assert !a.is(b)

## task