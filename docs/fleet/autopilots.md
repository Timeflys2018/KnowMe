# 定时任务

定时（autopilot）是 Agent Fleet 的**自动派发子系统** —— 到点自动把一个任务派给指定 agent，无需你在场。

![定时 tab：autopilot 列表 + 创建表单（每日 HH:MM + 绑定 agent + prompt）](/screenshots/fleet-autopilots.jpg)

## 建一个 autopilot

定时 tab 完整增删改查：

- 每日 **HH:MM** 触发时刻。
- 硬绑**单个 agent**（一个 autopilot 只派给一个 agent）。
- prompt + 可选模型。
- 启用 / 停用开关；编辑、删除。
- 列表空时内联显示创建表单，填完即建。

## 到点自动派发

主进程有一个**真实调度器**：

- 启动时 arm 所有已启用的 autopilot（每日）+ 所有定时任务（一次性 `scheduled_at`）。
- 到点自动派发对应任务给绑定的 agent。
- autopilot 触发后自动**重新 arm** 次日；一次性定时任务触发后删除。
- 启动补跑（boot-catchup）+ 退出前清理，避免漏跑或重复跑。

## 两种"定时"

| 来源 | 触发 | 周期 |
|---|---|---|
| **autopilot**（定时 tab 建） | 每日 HH:MM | 周期性，触发后自动续 |
| **定时任务**（[看板](/fleet/board)新建任务选「定时」） | 指定日期 + 时刻 | 一次性，触发后删除 |

::: warning 只派单个 agent
autopilot 硬绑单个 agent —— 不会自动派给整支小队（这是刻意的边界，避免无人值守的多 agent 自动编排）。
:::

## 接下来

- [任务看板](/fleet/board)：一次性定时任务从这里建
- [Agent Fleet 总览](/integrate/agent-fleet)
