# scrollbar-滚动条样式美化

[参考地址]( https://segmentfault.com/a/1190000012800450?utm_source=tag-newest)： https://segmentfault.com/a/1190000012800450?utm_source=tag-newest



## 1. 属性介绍

- ::-webkit-scrollbar    //滚动条整体部分
- ::-webkit-scrollbar-button   //滚动条两端的按钮
- ::-webkit-scrollbar-track   // 外层轨道
- ::-webkit-scrollbar-track-piece    //内层轨道，滚动条中间部分（除去）
- ::-webkit-scrollbar-thumb //滚动条里面可以拖动的那个
- ::-webkit-scrollbar-corner   //边角
- ::-webkit-resizer   ///定义右下角拖动块的样式



## 2. 全部属性
- :horizontal//适用于任何水平方向上的滚动条
- :vertical//适用于任何垂直方向的滚动条
- :decrement//适用于按钮和轨道碎片。表示递减的按钮或轨道碎片，例如可以使区域向上或者向右移动的区域和按钮
- :increment//适用于按钮和轨道碎片。表示递增的按钮或轨道碎片，例如可以使区域向下或者向左移动的区域和按钮
- :start//适用于按钮和轨道碎片。表示对象（按钮轨道碎片）是否放在滑块的前面
- :end //适用于按钮和轨道碎片。表示对象（按钮轨道碎片）是否放在滑块的后面
- :double-button//适用于按钮和轨道碎片。判断轨道结束的位置是否是一对按钮。也就是轨道碎片紧挨着一对在一起的按钮。
- :single-button//适用于按钮和轨道碎片。判断轨道结束的位置是否是一个按钮。也就是轨道碎片紧挨着一个单独的按钮。
- :no-button//表示轨道结束的位置没有按钮。
- :corner-present//表示滚动条的角落是否存在。
- :window-inactive//适用于所有滚动条，表示包含滚动条的区域，焦点不在该窗口的时候。





## 3. 修改css
```
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width:16px;
    height:16px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    border-radius:10px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
    background-color:#555;
}

::-webkit-scrollbar-track-piece:start {
   /* Select the top half (or left half) or scrollbar track individually */
}
::-webkit-scrollbar-thumb:window-inactive {
   /* Select the thumb when the browser window isn't in focus */
}
::-webkit-scrollbar-button:horizontal:decrement:hover {
   /* Select the down or left scroll button when it's being hovered by the mouse */
}
```




## 滚动条样式修改

1. scrollbar-corner：边角，两个滚动条的交汇处

```
::-webkit-scrollbar-corner{
    background-color: rgba(0,0,0,.4);
}
```
