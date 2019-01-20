---
abbrlink: '0'
---
问：Java的数据结构你用过哪些？Map与Set的本质区别是什么？

 

​      答：Java常见的数据结构有Collection和Map，其中Collection接口下包括List和Set接口，其下又有多个实现类如List下有ArrayList、LinkedList和Vector等实现类，Set下有HashSet、LinkedSet等实现类和SortedSet接口，HashSet下有LinkedHashSet子类，SortedSet接口下有TreeSet实现类。Map接口下有HashMap(有LinkedHashMap子类)、HashTable(有Properties子类)实现类和SortedMap接口(有TreeMap实现类)。 

我用过的数据结构主要有List、Set、Map、ArrayList、HashSet、HashMap、Properties等。 

Map与Set的本质区别我认为有：Set不能包含重复的元素，最多有一个空值，继承自Collection接口，底层是Map实现机制。Map不能包含重复的键，每个键最多对应一个映射的值，不能有空值键。两接口提供的方法不完全一样。 

 

 

问：Spring整合ORM框架时，事务管理用哪个类？是Spring控制事务的提交还是ORM框架控制？同一事务中执行两个更新操作，它的工作原理是怎样的？ 

​      答：Spring整合ORM框架时事务管理用的是相应ORM框架的事务管理器类如Hibernate对应于HibernateTransactionManager，JPA对应于JpaTransactionManager等。整合过后可配置由Spring控制事务的提交。事务提交前执行两个更新操作(不清楚其工作原理)。

 

 

问：Http协议你了解吗？文件上传时，进度条的设计原理是什么？ 

​      答：Http协议即超文本传输协议，属于应用层的面向对象的协议。它支持客户/服务器模式，简单快速、灵活、无连接和无状态。http请求由请求行、消息报头、请求正文组成，http响应由状态行、消息报头和响应正文组成。 

文件上传时进度条的设计原理：在java中主要用到I/O原理，已上传的数据值除以文件总大小的比值即实时进度的值。通过File类获取文件的总大小，在读取或写出文件时加一个进度计算的步骤，每读取或写出一次就计算进度值，更新进度条。

 

问：查询一个字段值有重复的表，要去除重复项，SQL语句怎么写？ 

​       答：在SQL语句中加上distinct关键字，如SELECT distinct(name),id FROM table、SELECT distinct name FROM table。

 

 

问：Java中的Annotation的工作原理是什么？ 

​       答：Annotation提供一种机制，将程序的元素如:类，方法，属性，参数，本地变量，包和元数据联系起来。这样编译器可以将元数据存储在Class文件中。这样虚拟机和其它对象可以根据这些元数据来决定如何使用这些程序元素或改变它们的行为。

 

 

问：分层架构中，Dao层的作用是什么？如果不要DAO层，能不能实现有Dao层时的优点？ 

​      答：Dao层又叫数据访问对象层, 封装数据库的底层操作细节如数据库的连接及对数据的CRUD等操作，它不但屏蔽了数据存储最终介质的不同，也屏蔽了具体实现技术的不同。一般在其上还会有Service层来封装业务操作进行进一步的解耦。不用DAO层也能实现Dao层时的优点如自己封装一个类似Dao层功能的数据库操作模板类，可参考Spring的DAO层思想。

 

 

 

BOM结构更改,0316013081更改为0316013081A；0617003329更改为0617003329C

问：HibernateDaoSupport,ActionSupport等类中所指的Support，是不是一种设计模式？若是，那说说你对这种设计模式的理解？ 

​      答：个人认为用到了IoC模式，即依赖注入，将程序代码中依赖对象的管理交由相应的容器去管理如在配置文件中进行注入配置。

 

 

问：对数据库的存储过程熟悉不？对CSS熟悉不？ 

​       答：数据库的存储过程是存储过程（stored procedure）是一组为了完成特定功能的sql 语句集，经编译后存储在数据库，用户通过指定存储过程的名字并给出参数（如果该存储过程带有参数）来执行它。从本质上讲触发器也是一种存储过程。存储过程可以调用另一个存储过程，它具有如下的优点：允许标准组件式编程因为它可以多次使用不必重复编写、能够实现较快的执行速度因为它是预编译的比批处理执行更快、能够减少网络流量因为它一次性可执行多个SQL语句、可作为一种安全机制来充分利用因为系统管理员可对存储过程进行权限限制。 

CSS又叫层叠样式表，是设计网页样式的工具，使用它可更方便的设计和管理网页样式，比普通的HTML标记样式更优秀和方便使用，具体使用在此不多讲。

 

 

问：说说Struts2的工作原理？ 

​        答：客户发起相应请求-》请求被提交到一系列有序的Filter中如ActionContextCleanUp和FilterDispatcher等-》ActionProxy代理类通过配置文件如struts.xml找到需要调用的Action类-》ActionProxy创建一个ActionInvocation的实例，同时ActionInvocation通过代理模式调用Action。但在调用之前ActionInvocation会根据配置加载Action相关的所有Interceptor-》ActionInvocation初始化时，根据配置，加载Action相关的所有Interceptor-》通过ActionInvocation.invoke方法调用Action实现时，执行Interceptor-》一旦Action执行完毕，ActionInvocation负责根据struts.xml中的配置找到对应的返回结果。如上文中将结构返回“add.jsp”，若是返回另外一个action，那么该流程又得走一遍。

 

问：Hibernate框架的设计有什么不好的地方？ 

​       答：配置麻烦、映射文件可能过于冗余、查询慢、对海量数据无能为力、太对象化限制了查询、级联关系也影响查询速度等。

 

 

问：你是怎么样实现分页显示的？具体原理怎么样？Hibernate的setMaxResults和setFirstResult内部是怎么实现分页查询的？ 

​       答：实现一个分页组件，可自实现或借用相应框架的实现。原理是求出所查数据总记录数，设置每页要显示的记录数，然后计算每页要显示的第一条记录数，根据每页要显示的记录数和总记录数来求出页数等。 

Hibernate的setMaxResults和setFirstResult内部是通过SQL语句来实现分页查询的，个人观点而已，未查看源代码。

问：Struts，Hibernate，Spring等框架，你哪个最熟悉？有没有读过它的源代码？你用过Spring框架的那些功能？ 

​       答：最熟悉的是Struts1.x，其次是Hibernate和Spring，读过其中的一些源代码，并没有去读所有的源代码。主要用过的是Spring的IoC和AOP和事务管理等功能。

 