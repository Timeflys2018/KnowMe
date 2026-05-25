# 4. 列表 + 折叠

## 4.1 三种列表 marker 共用一个对齐列

KnowMe 把无序点 `•`、有序数字 `1.`、任务复选框 `☐` 都对齐到同一列（marker cell 1.5em 宽，左对齐）。这样不同列表混排时视觉整齐。

<!-- SCREENSHOT: 同一文档中三种列表混排，marker 左边缘对齐。文件名建议：04-list-marker-alignment-1.png -->

## 4.2 嵌套缩进 + 竖线

子项每深一级缩进 1.5em，左侧自动绘制淡灰竖线指向父项的 marker 列。

```markdown
1. 父项
   1. 子项 A
      1. 孙项
   2. 子项 B
```

<!-- SCREENSHOT: 三层嵌套有序列表 + 左侧竖线。文件名建议：04-list-nested-bars-1.png -->

## 4.3 自动循环 marker

嵌套有序列表在视觉上自动循环 `1. → a. → i. → 1. → a. → i.`（仿 Obsidian），但**源 markdown 始终是数字**——用户编辑 / 复制 / 导出时拿到的是标准 CommonMark。

## 4.4 任务列表

```markdown
- [ ] 待办
- [x] 已完成
```

点击复选框切换状态。已完成项会**灰化 + 删除线**（可在 Settings 中关闭）。

<!-- SCREENSHOT: 任务列表 + 已完成项的灰化效果。文件名建议：04-task-list-checked-1.png -->

## 4.5 Tab / Shift+Tab 缩进

光标在列表项上：
- `Tab`：缩进一级
- `Shift+Tab`：减少一级

KnowMe 在缩进有序列表项时，会自动重新编号成 `1.`（确保新嵌套层级是合法 CommonMark）。

## 4.6 折叠

任意有子项的列表项左侧 hover 会出现折叠箭头 `v`。点击折叠该项 + 所有后代。折叠态显示 `…` 占位符。

<!-- SCREENSHOT: 列表项折叠前后对比。文件名建议：04-list-fold-1.png -->

## 4.7 折叠状态持久化

KnowMe 把每个文件的折叠状态写到 `localStorage[knowme.fold-ranges.<相对路径>]`，**重启 app 后保持折叠状态**。

> 持久化是按 vault + 相对路径 key 的。删除文件不会自动清掉记录（小量数据，无需在意）。

## 4.8 标题折叠

同样的 hover-then-click 机制对**标题行**也生效：

- 折叠 H1 → 隐藏到下一个 H1 之前的所有内容
- 折叠 H2 → 隐藏到下一个 H2 / H1 之前的所有内容
- ……依次类推

<!-- SCREENSHOT: 标题折叠状态。文件名建议：04-heading-fold-1.png -->
