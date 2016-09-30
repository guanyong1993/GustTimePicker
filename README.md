# GustScroll
A full browser compatible custom scroll bar solution

## 前置条件:
### &nbsp;&nbsp;依赖的JS库:
```html
<!-- 引入jQuery -->
<script src="jquery.1.11.3.min.js"></script>
<!-- 引入GustTimePicker  -->
<script src="GustTimePicker.js"></script>
```
### &nbsp;&nbsp;依赖的样式表:
```html
<!-- 引入GustTimePicker  -->
<link rel="stylesheet" href="gust-time-picker.css" />
```
## API:

### enable:

- `el` : (*Object*) 需要启用元素(jQuery元素)

```javascript
// 启动自定义滚动条
GustScroll.enable($('.test-container'));
```

### disable:

- `el` : (*Object*) 需要取消元素(jQuery元素)

```javascript
// 取消自定义滚动条
GustScroll.disable($('.test-container'));
```

### update:

- `el` : (*Object*) 需要更新元素(jQuery元素)

```javascript
// 更新自定义滚动条
GustScroll.update($('.test-container'));
```

### scrollTo:

- `el` : (*Object*) 需要滚动元素(jQuery元素)
- `value` : (*Number*) 需要滚动的值
- `animate` : (*Boolean*) 是否使用动画, 默认 `false`

```javascript
// 滚动滚动条到指定位置
GustScroll.scrollTo($('.test-container'), -50, true);
```

### scrollToTop:

- `el` : (*Object*) 需要滚动元素(jQuery元素)
- `animate` : (*Boolean*) 是否使用动画, 默认 `false`

```javascript
// 滚动滚动条到顶部
GustScroll.scrollToTop($('.test-container'), true);
```

### scrollToBottom:

- `el` : (*Object*) 需要滚动元素(jQuery元素)
- `animate` : (*Boolean*) 是否使用动画, 默认 `false`

```javascript
// 滚动滚动条到底部
GustScroll.scrollToBottom($('.test-container'), true);
```
