---
title: "OpenClaw CLI命令速查表"
created: "2026-03-09"
tags:
  - OpenClaw
  - CLI
  - 命令行
source: "inbox"
topic: "OpenClaw CLI参考"
status: "processed"
---

# OpenClaw CLI命令速查表

## Summary
OpenClaw CLI完整命令列表，按功能分类整理并附带中文说明。带`*`的命令有子命令，可用`<command> --help`查看详情。

## Note

> 💡 **提示**：带 `*` 的命令有子命令，运行 `<command> --help` 查看详情。

---

### 🚀 入门与配置

| 命令 | 说明 |
|------|------|
| `setup` | 初始化本地配置和Agent工作区 |
| `configure` | 交互式配置向导（凭证、频道、Gateway、Agent默认值） |
| `config *` | 非交互式配置助手（get/set/unset/file/validate） |
| `onboard` | 交互式入门向导（Gateway、工作区、Skills） |
| `reset` | 重置本地配置/状态（保留CLI安装） |
| `uninstall` | 卸载Gateway服务+本地数据（CLI保留） |
| `completion` | 生成Shell补全脚本 |

---

### 🔌 Gateway与Node

| 命令 | 说明 |
|------|------|
| `gateway *` | 运行、检查和查询WebSocket Gateway |
| `daemon *` | Gateway服务（旧版别名） |
| `node *` | 运行和管理无头Node主机服务 |
| `nodes *` | 管理Gateway拥有的Node配对和Node命令 |
| `health` | 获取运行中Gateway的健康状态 |
| `doctor` | Gateway和频道的健康检查+快速修复 |
| `logs` | 通过RPC实时查看Gateway日志文件 |
| `status` | 显示频道健康和最近会话接收者 |

---

### 🤖 Agent与工作区

| 命令 | 说明 |
|------|------|
| `agent` | 通过Gateway运行一次Agent轮次 |
| `agents *` | 管理隔离的Agent（工作区、认证、路由） |
| `acp *` | Agent Control Protocol工具 |
| `skills *` | 列出和查看可用的Skills |
| `hooks *` | 管理内部Agent钩子 |
| `memory *` | 搜索和重建记忆文件索引 |
| `sessions *` | 列出存储的对话会话 |
| `sandbox *` | 管理Agent隔离的沙箱容器 |

---

### 💬 消息与频道

| 命令 | 说明 |
|------|------|
| `channels *` | 管理已连接的聊天频道（Telegram、Discord等） |
| `message *` | 发送、读取和管理消息 |
| `directory *` | 查询支持的聊天频道的联系人和群组ID |
| `system *` | 系统事件、心跳和在线状态 |

---

### 🔗 配对与设备

| 命令 | 说明 |
|------|------|
| `pairing *` | 安全DM配对（批准入站请求） |
| `devices *` | 设备配对+Token管理 |
| `qr` | 生成iOS配对二维码/设置码 |

---

### 🛠️ 工具与集成

| 命令 | 说明 |
|------|------|
| `browser *` | 管理OpenClaw专用浏览器（Chrome/Chromium） |
| `cron *` | 通过Gateway调度器管理定时任务 |
| `webhooks *` | Webhook助手和集成 |
| `plugins *` | 管理OpenClaw插件和扩展 |
| `dns *` | DNS助手，用于广域发现（Tailscale + CoreDNS） |
| `approvals *` | 管理执行审批（Gateway或Node主机） |
| `secrets *` | 密钥运行时重载控制 |

---

### 🔍 查询与安全

| 命令 | 说明 |
|------|------|
| `docs` | 搜索实时OpenClaw文档 |
| `models *` | 发现、扫描和配置模型 |
| `security *` | 安全工具和本地配置审计 |

---

### 🖥️ 界面

| 命令 | 说明 |
|------|------|
| `tui` | 打开连接到Gateway的终端UI |
| `dashboard` | 使用当前Token打开控制UI |

---

### 🔄 更新与维护

| 命令 | 说明 |
|------|------|
| `update *` | 更新OpenClaw并检查更新频道状态 |
| `clawbot *` | 旧版clawbot命令别名 |

---

## 常用命令速查

```bash
# 首次安装后初始化
openclaw setup

# 检查健康状态
openclaw doctor
openclaw health

# 查看日志
openclaw logs

# 打开终端UI
openclaw tui

# 搜索文档
openclaw docs <query>

# 列出可用Skills
openclaw skills list
```

## Keywords
- OpenClaw
- CLI
- 命令参考
- Gateway

## Related
- [[OpenClaw新手注意事项]]
- [[OpenClaw内置Hooks说明]]
- [[OpenClaw macOS启动报错排查]]
