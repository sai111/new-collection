# jquery 知识结构

目前来说，jQuery 可能已经不再处于人们的话题中心。人们讨论的更多的是 Vue、Angular 和 React。但是，jQuery 的使用量依然广泛，据统计，它仍然是目前使用率最高的 javascript 库。jQuery 简化了 javascript 的复杂操作，不再需要关心兼容性，提供了大量的实用方法。由于 jQuery 的简单易用，它在以前常常是人们不学习原生 javascript 的一个借口。确实，jQuery 可以搞定一切。但，要正确的看待 jQuery，把它看成 javascript 的一个辅助工具，进阶学习工具，而不是替代工具

将前端工程师需要掌握的 jQuery 的知识和技能进行了梳理和归纳，总结成以下目录

- 基础
  - [设计思想](base/design.md)
  - [理解 jQuery 对象$](base/jqueryObj.md)
  - [简易版 jQuery——mQuery](base/mQuery.md)
  - [代码优化](base/optimize.md)
- 选择器
  - [基础和层级选择器](selector/baseAndLevelSelector.md)
  - [表单选择器](selector/formSelector.md)
  - 过滤选择器
    - [子元素选择器](selector/childElementSelector.md)
    - [索引选择器](selector/indexSelector.md)
    - [属性选择器](selector/attrSelector.md)
    - [内容选择器](selector/contentSelector.md)
    - [状态选择器](selector/statusSelector.md)
    - [伪子元素选择器](selector/pseudoChildElementSelector.md)
  - 常见操作
  - [杂项方法](method/miscellaneous.md)
  - [工具方法](method/utils.md)
  - [节点关系](method/nodeRelation.md)
  - [节点操作](method/nodeOperation.md)
  - [特性操作](method/attrOperation.md)
  - [文本内容](method/contents.md)
  - [样式操作](method/styleOperation.md)
  - [元素尺寸和位置操作](method/clientBounding.md)
  - [ajax](method/ajax.md)
  - 事件
    - [事件绑定](event/eventHandle.md)
    - [事件对象](event/eventObject.md)
    - [鼠标事件](event/mouse.md)
  - 动画
    - [常见动画](animate/threeAnimation.md)
    - [自定义动画](animate/customAnimation.md)
    - [动画队列](animate/queueAnimation.md)
    - [动画控制](animate/controlAnimation.md)
  - 插件
    - [validation](validate/validation.md)
    - [编写 jQuery 插件](validate/makePlug.md)
