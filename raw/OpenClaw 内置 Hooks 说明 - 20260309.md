---
title: "OpenClaw内置Hooks说明"
created: "2026-03-09"
tags:
  - OpenClaw
  - Hooks
  - 配置
source: "inbox"
topic: "OpenClaw功能配置"
status: "processed"
---

# OpenClaw内置Hooks说明

## Summary
记录OpenClaw四种内置Hooks的功能说明和使用场景，帮助决定是否启用。

## Note

### 什么是Hooks
Hooks是OpenClaw在启动、会话重置、命令执行等时机自动执行的附加动作。

### 四种内置Hooks

| Hook | 官方说明 | 通俗理解 | 适用场景 |
|------|---------|---------|---------|
| **boot-md** | Run BOOT.md on gateway startup | 开机先读一份启动说明 | 想让每次启动都遵守固定规则 |
| **bootstrap-extra-files** | Inject extra workspace bootstrap files during agent bootstrap | 把工作区里额外规则文件带进上下文 | 有完整 bootstrap 文件体系时 |
| **command-logger** | Log all command events to a centralized audit file | 记录操作日志 | 想保留操作审计、便于排查 |
| **session-memory** | Save session context to memory when /new command is issued | 开新会话前自动存档记忆 | 想让 /new 之前自动记住上下文 |

### 相关文件体系
`bootstrap-extra-files` 涉及的文件：
- `AGENTS.md`
- `SOUL.md`
- `TOOLS.md`
- `IDENTITY.md`
- `USER.md`
- `HEARTBEAT.md`
- `BOOTSTRAP.md`

### 启用建议

#### 新手首次启动
**建议选 "Skip for now"**

原因：
- 这些hook不是Gateway启动的最基础前提
- 4个hook会在启动时一起加载，可能影响性能
- 先把Gateway连通，后面再到 `Settings → Skills / Hooks` 里逐个开启

#### 按需启用
- 想让它每次启动都遵守固定规则 → 开 `boot-md`
- 想保留操作审计 → 开 `command-logger`
- 想让 /new 之前自动记住上下文 → 开 `session-memory`
- 有完整 workspace/bootstrap 文件体系时 → 考虑 `bootstrap-extra-files`

## Keywords
- OpenClaw
- Hooks
- boot-md
- session-memory

## Related
- [[OpenClaw新手注意事项]]
- [[OpenClaw macOS启动报错排查]]
