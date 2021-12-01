# CSS 知识结构

CSS 是前端工程师的基本功，但好多执迷于学习 javascript 的人的基本功并不扎实。可能一些人从 w3school 网站匆匆过了一遍，只是对 CSS 常用概念有一些表面上的理解，就一头扎进 javascript 的深坑里跳不出来。实际上，javascript 中比较复杂的逻辑很有可能使用 CSS 几行样式就能解决问题，而且性能还好。

CSS 之所以能成为一门优雅的语言，以及有其对应的重构工程师的岗位，是因为这本语言本身就有很强的存在价值，且真正要理解它并不容易。从[CSS 禅意花园](http://www.csszengarden.com/)开始，写 CSS 成为一种艺术。从 CSS2.1 到 3 再到 4，CSS 所涵盖的内容及可实现的功能得到了极大的丰富，使得 CSS 的学习成本也越来越高。再多的知识，一个知识点一个知识点去学，总能学明白。

将 CSS 的知识体系进行了梳理和归纳，总结成以下目录

- 基础
  1. 基础语法
     - [引入 CSS](grammar/grammar_intro.md)
     - [选择器](grammar/grammar_selector.md)
     - [选择器新用法](grammar/grammar_selectorNew.md)
     - [层叠](grammar/grammar_cascading.md)
     - [单位](grammar/grammar_Unit.md)
     - [样式关键字](grammar/grammar_keywords.md)
     - [calc()](grammar/grammar_calc.md)
     - [默认可继承样式](grammar/grammar_inherit.md)
     - [CSS Why](grammar/grammar_why.md)
     - [变量 Variable](grammar/grammar_variable.md)
     - [属性速查表](grammer/grammar_attribute.md)
  2. 伪类伪元素
     - [伪元素](grammar/grammar_PseudoEle.md)
     - [计数器](grammar/grammar_counter.md)
     - [伪类](grammar/grammar_PseudoClass.md)
  3. 兼容
     - [CSS Hack](grammar/grammar_hack.md)
     - [CSS 兼容性详解](grammar/grammar_compatible.md)
     - [haslayout](grammar/grammar_haslayout.md)
  4. 规范
     - [CSS reset](grammar/grammar_reset.md)
     - [CSS 命名实践](grammar/grammar_CSSNamed.md)
     - [CSS 规范](grammar/grammar_specification.md)
     - [命名规范](grammar/grammar_namingConvention.md)
     - [CSS 编码技巧](grammar/grammar_codingTech.md)
- 布局
  1. 盒模型
     - 盒子尺寸
       1. [盒模型](layout/box/box.md)
       2. [四个自适应宽高关键字](layout/box/WHkeywords.md)
       3. [边框和阴影](layout/box/borderAndShadow.md)
       4. [margin 要点](layout/box/marginKey.md)
       5. [margin 负值](layout/box/marginNeg.md)
       6. [轮廓 outline](layout/box/outline.md)
     - 弹性盒模型
       1. [弹性盒模型 flex](layout/box/flex.md)
       2. [旧版 flex 及兼容](layout/box/flexCompatible.md)
       3. [flex 布局应用](layout/box/flexLayout.md)
     - 盒子显示
       1. [溢出 overflow](layout/box/overflow/overflow.md)
       2. [裁剪 clip](layout/box/overflow/clip.md)
       3. [拉伸 resize](layout/box/overflow/resize.md)
       4. [滚动条](layout/box/overflow/scrollBar.md)
       5. [可见性 visibility](layout/box/overflow/visibility.md)
  2. 普通流
     - [display](layout/FC/display.md)
     - [haslayout](layout/FC/haslayout.md)
     - [BFC](layout/FC/BFC.md)
     - [视觉格式化](layout/FC/visualFormat.md)
     - [文本方向](layout/FC/dir.md)
  3. 浮动
     - [浮动](layout/float/float.md)
     - [清浮动](layout/float/clear.md)
  4. 定位
     - [定位中的偏移](layout/position/offset.md)
     - [定位中的堆叠 z-index](layout/position/zIndex.md)
     - [绝对定位](layout/position/absolute.md)
     - [绝对定位应用](layout/position/absoluteApply.md)
     - [相对定位和固定定位](layout/position/relativeAndFixed.md)
  5. 布局方式
     - 布局系统
       1. [Media 媒体查询](layout/layoutMode/media.md)
       2. [多列布局](layout/layoutMode/columns.md)
       3. [grid 栅格布局](layout/layoutMode/grid.md)
       4. [移动优先的响应式布局](layout/layoutMode/mobileFirst.md)
     - 居中布局
       1. [水平居中](layout/layoutMode/center.md)
       2. [垂直居中](layout/layoutMode/middle.md)
       3. [水平垂直居中](layout/layoutMode/centerAndMiddle.md)
     - 常见布局
       1. [两端对齐](layout/layoutMode/justify.md)
       2. [单列定宽单列自适应布局](layout/layoutMode/oneFixedAndOneAdaptive.md)
       3. [两列自适应布局](layout/layoutMode/twoAdaptive.md)
       4. [三列布局](layout/layoutMode/threeColumns.md)
       5. [三栏式布局](layout/layoutMode/sepcialThreeColumns.md)
       6. [等分布局](layout/layoutMode/equalPart.md)
       7. [等高布局](layout/layoutMode/equalHeight.md)
       8. [全屏布局](layout/layoutMode/fullScreen.md)
       9. [sticky-footer 布局](layout/layoutMode/stickyFooter.md)
- 渲染
  1. 字体和文本
     - [字体](render/text/font.md)
     - [基础文本样式](render/text/textStyle.md)
     - [行高与垂直对齐](render/text/lineHeight.md)
     - [换行和空白符](render/text/wrap.md)
     - [文本溢出和文本阴影](render/text/textOverflowAndShadow.md)
  2. 颜色和背景
     - [颜色模式](render/color/colorMode.md)
     - [颜色模式转换器](render/color/colorModer.md)
     - [前景色和透明度](render/color/colorAndOpacity.md)
     - [背景](render/color/background.md)
     - [光标](render/color/cursor.md)
  3. 变形和动画
     - [过渡 transition](render/animation/transition.md)
     - [变形 transform(2d)](render/animation/transform2d.md)
     - [变形 transform(3d)](render/animation/transform3d.md)
     - [变形 transform 的副作用](render/animation/sideEffectOfTransform.md)
     - [线性渐变](render/animation/linearRradient.md)
     - [径向渐变](render/animation/radialRradient.md)
     - [动画 animation](render/animation/animation.md)
     - [动画 animation 的三个应用](render/animation/animationApply.md)
     - [animate.css 的使用](render/animation/animate.md)
  4. 渲染属性
     - [混合模式](render/renderAttr/blendMode.md)
     - [滤镜](render/renderAttr/filter.md)
     - [倒影](render/renderAttr/reflect.md)
     - [页面渲染优化属性 will-change](render/renderAttr/willChange.md)
     - [遮罩 mask](render/renderAttr/mask.md)
     - [路径裁剪 clip-path](render/renderAttr/clipPath.md)
- 效果
  - [元素显示隐藏的 9 种思路](impact/showHide.md)
  - [实现滑动门的 3 种方法](impact/sliding.md)
  - [导航条 Tab 切换](impact/tab.md)
  - [CSS 画出的图](impact/picture.md)
  - [纹理文本](impact/vein.md)
  - [CSS 文本效果](impact/textEffects.md)
  - [CSS 边框效果](impact/borderEffects.md)
  - [CSS 背景效果](impact/backgroundEffects.md)
  - [CSS 遮罩和毛玻璃效果](impact/maskEffects.md)
