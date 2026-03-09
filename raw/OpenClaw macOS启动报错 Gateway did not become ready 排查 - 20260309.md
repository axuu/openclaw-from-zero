---
title: "OpenClaw macOS启动报错排查"
created: "2026-03-09"
tags:
  - OpenClaw
  - macOS
  - 故障排查
source: "inbox"
topic: "OpenClaw安装问题"
status: "processed"
---

# OpenClaw macOS启动报错排查

## Summary
记录OpenClaw在macOS上启动时报错"Gateway did not become ready"的原因和解决方案。最常见的原因是**未安装CLI和Node**。

## Note

### 报错信息
```
Wizard error
Gateway did not become ready. Check that it is running.
```

### ⚠️ 最常见原因
**未安装 openclaw CLI 和 Node.js**

这是2026年2月macOS用户最常遇到的问题。OpenClaw macOS App **不再内置Gateway运行时**，必须依赖机器上单独安装的 openclaw CLI。

### 系统要求
- **Node.js 22+**
- **全局安装 openclaw CLI**

### 排查步骤

#### 1. 确认CLI和Node是否齐全
```bash
node --version      # 应显示 v22.x.x 或更高
openclaw --version  # 确认CLI已安装
which openclaw      # 确认CLI在PATH中
```

#### 2. 如果未安装
```bash
# 安装Node.js（推荐使用nvm）
nvm install 22
nvm use 22

# 全局安装openclaw CLI
npm install -g openclaw
```

#### 3. 重启OpenClaw App
安装完成后重启OpenClaw，Setup Wizard应能正常拉起Gateway。

### 技术背景
OpenClaw在macOS上的启动机制：
- macOS App本身**不内置Gateway运行时**
- 依赖机器上单独安装的 `openclaw` CLI
- App通过 launchd 管理每用户的Gateway服务
- 服务label: `ai.openclaw.gateway`
- 正常健康状态应显示: `Runtime: running` 和 `RPC probe: ok`

### 验证Gateway状态
```bash
# 检查launchd服务状态
launchctl list | grep openclaw

# 查看服务日志
log show --predicate 'process == "openclaw"' --last 5m
```

## Keywords
- OpenClaw
- Gateway
- CLI
- Node.js
- macOS

## Related
- [[OpenClaw新手注意事项]]
- [[终端工具集]]
