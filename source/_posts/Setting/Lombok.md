---

title: Lombok使用方法详解
tags:
  - Lombok
categories:
  - Tools
toc: true
typora-copy-images-to: ../../gitbooks/static/images/196eb970
abbrlink: 196eb970
---

## 背景

在面向对象编程中因为定义的业务模型对象比较多，需要重复写Getter/Setter、构造器方法、字符串输出的ToString方法和Equals/HashCode方法等。现在使用Lombok工具把我们需要重复劳作的事给解决掉，使代码变得简洁跟优雅。

## 参考

https://projectlombok.org/features/all

## IDEA 中集成Lombok 插件 并使用Lombok简化代码

### 安装Lombok插件

IDEA中添加Lombok插件, File -> Setting -> Plugins 搜索Lombok Plugin， 点击install，安装完成后重启IDEA

### 使用Lombok简化代码

只需要每个属性一行代码就行 	

```
@Data
public class OrderItem implements Serializable {

    private Long id;
    private Integer num;
    private BigDecimal unitPrice;
    private BigDecimal paymentPrice;
    private Long orderId;

}
```
## Lombok注解

```
val：用在局部变量前面，相当于将变量声明为final
@NonNull：给方法参数增加这个注解会自动在方法内对该参数进行是否为空的校验，如果为空，则抛出NPE（NullPointerException）
@Cleanup：自动管理资源，用在局部变量之前，在当前变量范围内即将执行完毕退出之前会自动清理资源，自动生成try-finally这样的代码来关闭流
@Getter/@Setter：用在属性上，再也不用自己手写setter和getter方法了，还可以指定访问范围
@ToString：用在类上，可以自动覆写toString方法，当然还可以加其他参数，例如@ToString(exclude=”id”)排除id属性，或者@ToString(callSuper=true, includeFieldNames=true)调用父类的toString方法，包含所有属性
@EqualsAndHashCode：用在类上，自动生成equals方法和hashCode方法
@NoArgsConstructor, @RequiredArgsConstructor and @AllArgsConstructor：用在类上，自动生成无参构造和使用所有参数的构造函数以及把所有@NonNull属性作为参数的构造函数，如果指定staticName = “of”参数，同时还会生成一个返回类对象的静态工厂方法，比使用构造函数方便很多
@Data：注解在类上，相当于同时使用了@ToString、@EqualsAndHashCode、@Getter、@Setter和@RequiredArgsConstrutor这些注解，对于POJO类十分有用
@Value：用在类上，是@Data的不可变形式，相当于为属性添加final声明，只提供getter方法，而不提供setter方法
@Builder：用在类、构造器、方法上，为你提供复杂的builder APIs，让你可以像如下方式一样调用Person.builder().name("Adam Savage").city("San Francisco").job("Mythbusters").job("Unchained Reaction").build();更多说明参考Builder
@SneakyThrows：自动抛受检异常，而无需显式在方法上使用throws语句
@Synchronized：用在方法上，将方法声明为同步的，并自动加锁，而锁对象是一个私有的属性$lock或$LOCK，而java中的synchronized关键字锁对象是this，锁在this或者自己的类对象上存在副作用，就是你不能阻止非受控代码去锁this或者类对象，这可能会导致竞争条件或者其它线程错误
@Getter(lazy=true)：可以替代经典的Double Check Lock样板代码
@Log：根据不同的注解生成不同类型的log对象，但是实例名称都是log，有六种可选实现类
@CommonsLog Creates log = org.apache.commons.logging.LogFactory.getLog(LogExample.class);
@Log Creates log = java.util.logging.Logger.getLogger(LogExample.class.getName());
@Log4j Creates log = org.apache.log4j.Logger.getLogger(LogExample.class);
@Log4j2 Creates log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
@Slf4j Creates log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
@XSlf4j Creates log = org.slf4j.ext.XLoggerFactory.getXLogger(LogExample.class);
```

 