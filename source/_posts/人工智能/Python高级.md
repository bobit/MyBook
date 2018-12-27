---
title: Python高级
tags:
  - python
categories:
  - Python
toc: true
abbrlink: bce7e83e
date: 2017-09-02 09:00:12
---

## [TOC]
## Python3列表排序
    python语言中的列表排序方法有4个：利用步长对序列进行倒序取值、reverse反向排序、sort正序排序、sorted可以获取排序后的列表。

### 利用步长对序列进行倒序取值
    str_list = ['a', 'b', 'd', 'c']
    print(str_list[::-1] ) # 输出['c', 'd', 'b', 'a']

### reverse()方法
    str_list = ['a', 'b', 'd', 'c']
    str_list.reverse()
    print(str_list)#输出['c', 'd', 'b', 'a']
    reverse列表反转排序：是把原列表中的元素顺序从左至右的重新存放，而不会对列表中的参数进行排序整理。如果需要对列表中的参数进行整理，就需要用到列表的另一种排序方式sort正序排序。

### sort()排序方法
    此函数方法对列表内容进行正向排序，排序后的新列表会覆盖原列表（id不变），也就是sort排序方法是直接修改原列表list排序方法。
    
    正向排序
    str_list = ['a', 'b', 'd', 'c']
    str_list.sort()
    print(str_list)#输出['a', 'b', 'c', 'd']
    
    反向排序
    str_list = ['a', 'b', 'd', 'c']
    str_list.sort(reverse=True)
    print(str_list)  # 输出['d', 'c', 'b', 'a']
    
    问题：print(str_list.sort())返回值为None
    原因：list.sort()功能是针对列表自己内部进行排序， 不会有返回值， 因此返回为None。
    解决：解决办法：
       1）
       str_list.sort()
       print(str_list)
       2)
       print(sorted(str_list))

### sorted()方法
    即可以保留原列表，又能得到已经排序好的列表sorted()操作方法如下：
    
    正向排序
    str_list = ['a', 'b', 'd', 'c']
    str_list_sorted = sorted(str_list)
    print(str_list)#输出['a', 'b', 'd', 'c']
    print(sorted(str_list))#输出['a', 'b', 'c', 'd']
    
    反向排序
    str_list = ['a', 'b', 'd', 'c']
    str_list_sorted = sorted(str_list,reverse=True)
    print(str_list)#输出['a', 'b', 'd', 'c']
    print(sorted(str_list,reverse=True))#输出['d', 'c', 'b', 'a']
     
    sorted()方法可以用在任何数据类型的序列中，返回的总是一个列表形式：
    print(sorted('iloveapitest@163.com'))#输出['.', '1', '3', '6', '@', 'a', 'c', 'e', 'e', 'i', 'i', 'l', 'm', 'o', 'o', 'p', 's', 't', 't', 'v']

### 总结
    不是根据首字母排序,可以理解为列表倒序可以使用reverse()，
    根据字母顺序排序可以使用sorted(list)函数；
    根据字母相反顺序排序可以使用sorted(list, reverse = True)函数；  
## 切片操作

### 切片操作的方法
    对于具有序列结构的数据来说，切片操作的方法是：consequence[start_index: end_index: step]。
    start_index：表示是第一个元素对象，正索引位置默认为0；负索引位置默认为 -len(consequence)
    end_index：表示是最后一个元素对象，正索引位置默认为 len(consequence)－1；负索引位置默认为 -1。
    step：表示取值的步长，默认为1，步长值不能为0。

### 几种常见的表达
    con[start_index: ]：缺省end_index，表示从start_index开始到序列中最后一个对象。
    con[: end_index］：缺省start_index，表示从序列中第一个对象到end_index-1之间的片段。
    con[:]：缺省start_index和end_index，表示从第一个对象到最后一个对象的完整片段。
    con[::step]：缺省start_index和end_index，表示对整个序列按照索引可以被step整除的规则取值。
    
    在使用单索引对序列寻址取值时，你所输入的索引值必须是处于 -len(consequence) 到 len(consequence)-1 之间的值，否则会报错提示索引值超出范围。如：
    list = [1, 2, 3, 4, 5, 6, 7]
    print(list[len(list) - 1])
    print(list[-len(list)])
    #print(list[len(list)])

### 利用步长对序列进行倒序取值
    list_a=[1,2,3,4,5,6,7]
    list_b=(1,2,3,4,5,6,7)
    list_c='Let me show you list little thing'
    print(list_a[::-1])
    print(list_b[::-1])
    print(list_c[::-1])
    list_a.reverse()
    print(list_a)
    #相对reverse而言，切片的方法不会改变列表的结构，所以这是在实际应用中比较有用的一个技巧。
