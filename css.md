# CSS

## 盒子模型
- 浏览器渲染元素时会把每个元素表示为一个个矩形的盒子，从内到外依次是content、padding、border、margin
- 不同盒子模型主要影响width和height属性的范围，标准盒子模型width只包括content，IE盒子模型width包括content、padding和border三个

## 定位与文档流
文档流指html元素的布局顺序，从左到右、从上到下。
- float：浮动定位，脱离文档流，形成遮盖的效果，不遮盖文字
- position: 
    - absolute 脱离文档流，全部遮盖;相对上层的第一个非static元素定位
    - static 浏览器默认不做改动
    - relative 相对自身的默认位置定位
    - fixed 浏览器固定位置
    - sticky 粘性定位，相对自身位置定位，当滚动到指定位置时，变成固定定位;移动范围受父元素限制。

## 回流、重绘
- 回流指重新从头布局
    - 元素位置、大小变化
    - 元素内容变化
    - 视口变化
- 重绘指重新渲染绘制
    - 修改颜色、阴影等属性

## 实际应用
#### 隐藏页面元素
- display:none（元素消失）
- 设置透明度为0（元素保留）
- 设置可见性为hidden（元素保留）

#### 水平垂直居中
- 简单版：使用布局grid、flex、table，设置横向和纵向对齐均为center
- 复杂版（少用）：position:absolute + transform:translate()或margin

#### BFC区域
[box.html](box.html)

#### 响应式设计
本质：利用媒体查询@media获得设备宽度，然后进行样式调整  
1. 不同.css文件全部替换
2. 百分比或vw、vh作单位（简单页面）
3. 使用rem作单位，查询替换根元素的font-size
4. 使用ui框架如element-ui

#### 