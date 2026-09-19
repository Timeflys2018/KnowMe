# Git 同步环境准备（GitHub 新手向）

知我的[知识空间共享与同步](/core/sync-sharing)建立在你本机的 git 和一个 git 远端之上：**知我只是在本地调用系统 git 做拉取和推送，不存储任何 git 账号密码**，认证完全走你自己电脑上的 git / SSH 配置。

这篇指南面向**第一次接触 git / GitHub** 的用户，从零带你走完整条路径。跟着做完，你会得到一个配好认证的电脑、一个空的私有仓库，以及在知我里跑起来的同步。功能本身的完整说明（自动同步时机、冲突处理、并发编辑注意事项）见 [知识空间共享与同步](/core/sync-sharing)。

::: tip 开始前你需要
- 一个 **GitHub 账号**（没有的话先去 [github.com](https://github.com) 免费注册）。
- 知我里要同步的那个目录（主目录或已挂载的外部目录）。
:::

::: warning 两点先说清楚
- **远端内容是明文存储的，不是端到端加密**：你同步的笔记在 GitHub 仓库里以明文保存，仓库成员和平台管理员可见。私密内容请自行斟酌。
- **知我不授予任何 GitHub 权限**：团队成员要能同步，必须由你在 GitHub 上把他加为仓库成员（Collaborator），这一步在知我之外完成。
:::

## 1. 检查 / 安装 Git

打开终端（macOS 用「终端」；Windows 安装 Git 后用自带的「Git Bash」），输入：

```bash
git --version
```

- **能显示版本号**（如 `git version 2.39.x`）→ 跳到第 2 步。
- **macOS 提示未安装** → 执行 `xcode-select --install`，按提示装完再来。
- **Windows** → 到 [git-scm.com](https://git-scm.com/download/win) 下载安装（一路默认选项即可），装完打开「Git Bash」继续。

## 2. 配置你的 git 身份

git 每次提交都会记录「是谁改的」，需要一个名字和邮箱：

```bash
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
```

邮箱建议和 GitHub 账号一致；不想暴露真实邮箱，可用 GitHub 提供的 `用户名@users.noreply.github.com` 占位邮箱（在 GitHub → Settings → Emails 里能看到）。

## 3. 生成 SSH 密钥

SSH 密钥是让 GitHub 认出「这台电脑就是你」的凭证。终端里执行（邮箱换成你自己的，只是个标注）：

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

- 问保存位置 → **直接回车**用默认路径（`~/.ssh/id_ed25519`）。
- 问 passphrase → 最省事的路径是留空直接回车；如果你选择设置密码，请按下面的方法把私钥加载进系统的 `ssh-agent`，否则 KnowMe 后台同步时不会弹出密码框，会直接认证失败。

如果提示已存在同名文件，说明这台电脑以前生成过密钥——可以直接复用，跳到第 4 步。

如果你给私钥设置了 passphrase：

- **macOS**：执行 `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`，让系统钥匙串代管解锁。
- **Windows Git Bash**：先执行 `eval "$(ssh-agent -s)"`，再执行 `ssh-add ~/.ssh/id_ed25519`；重启后如果认证又失败，需要重新加载。

## 4. 把公钥添加到 GitHub

先复制**公钥**内容（注意是 `.pub` 结尾的那个）：

```bash
cat ~/.ssh/id_ed25519.pub
```

把输出的整行复制下来，然后：

1. 打开 GitHub → 右上角头像 → **Settings**。
2. 左侧 **SSH and GPG keys** → **New SSH key**。
3. Title 随便起个能认出这台电脑的名字（如「家里的 Mac」），Key 里粘贴刚复制的内容，保存。

## 5. 验证连接

```bash
ssh -T git@github.com
```

第一次连接会问是否信任 github.com 的指纹，输入 `yes`。看到下面这行就说明认证通了：

```
Hi <你的用户名>! You've successfully authenticated, but GitHub does not provide shell access.
```

## 6. 创建一个空的私有仓库

1. GitHub 右上角 **+** → **New repository**。
2. 起个名字（如 `knowme-notes`），可见性选 **Private**。
3. **不要勾选**「Add a README」「Add .gitignore」「Choose a license」——保持仓库完全为空，知我首次推送才不会被远端已有内容挡住。
4. 创建后，在仓库页点绿色 **Code** 按钮，切到 **SSH**，复制地址，形如 `git@github.com:你的用户名/knowme-notes.git`。

## 7. 在知我里开启同步

1. 打开知我 **设置 → 同步**。
2. 在要同步的目录那行点「**设置同步**」，粘贴上一步复制的 SSH 地址。
3. 如果这个空间要给团队用，勾选「**这是共享空间（团队可见）**」。
4. 保存后，知我会自动把该目录初始化为 git 仓库并推送到远端。

![「设置同步」表单：粘贴 git 远端地址，可勾选「这是共享空间（团队可见）」](/screenshots/sync-setup-form.jpg)

改一个文件试试，然后在该目录的同步行点「**立即同步**」——到 GitHub 仓库页刷新，能看到这条提交，就说明整条链路通了。

## 8. 邀请队友（在 GitHub 上加 Collaborator）

共享空间搭好后，**队友的推送权限只能在 GitHub 上授予**：

1. 打开仓库 → **Settings** → 左侧 **Collaborators** → **Add people**。
2. 输入队友的 GitHub 用户名或邮箱，发出邀请。队友在邮件或 GitHub 通知里**接受邀请**后才算生效。

知我侧的「邀请成员」只是把仓库地址发给对方，**不授予任何权限**——权限完全由 git 平台管理。

## 9. 队友的加入流程

队友在他自己的电脑上：

1. **同样完成本指南第 1～5 步**（他的电脑、他的密钥、他的 GitHub 账号），并接受你的 Collaborator 邀请。
2. 打开知我 **设置 → 同步**，点「**加入共享空间**」，粘贴你给的空间地址（或直接点你分享的文档链接，按提示加入）。
3. 加入后目录会拉取到本地，开始自动同步。

![设置 → 同步 里的「加入共享空间」入口](/screenshots/sync-join-space.jpg)

## 常见问题排查

**`ssh -T` 报 `Permission denied (publickey)`？**
公钥没配对。确认：① 第 4 步复制的是 `.pub` 公钥的**完整一行**；② 贴到了**本机使用的这个 GitHub 账号**下；③ 本机确实有 `~/.ssh/id_ed25519` 文件。改完后重跑第 5 步。

**知我同步报「认证失败」？**
本机 git 认证没通（回到第 1～5 步），或者你对这个仓库**没有写权限**（私有仓库没被加为 Collaborator）。先在终端验证 `ssh -T git@github.com` 能过，再让空间发起人在 GitHub 上确认你的权限。

**首次推送被拒 / 提示远端有内容？**
建仓时勾了 README 之类的初始化文件。最简单的办法：删掉这个仓库，按第 6 步重建一个**什么都不勾**的空仓库。

**Windows 上命令不认？**
确认你用的是安装 Git 后自带的「Git Bash」，不是 PowerShell / cmd。

## 用 Gitee / 自建 GitLab？只差一点

整体流程完全一样，只有平台操作的位置不同：

| 步骤 | Gitee | 自建 GitLab |
|---|---|---|
| 添加 SSH 公钥 | 头像 → 设置 →「安全设置 → SSH 公钥」 | 头像 → Preferences → SSH Keys |
| 远端地址形如 | `git@gitee.com:你的用户名/仓库.git` | `git@你们的域名:组/仓库.git`（`ssh -T` 也换成你们域名） |
| 添加成员 | 仓库页 →「管理 → 仓库成员」 | Project → Manage → Members，角色至少 **Developer** |

其余步骤（生成密钥、知我侧配置、加入共享空间）一字不差。

---

配置好之后，回到 [知识空间共享与同步](/core/sync-sharing) 了解自动同步的时机、文件状态标记、冲突处理和并发编辑的注意事项。
