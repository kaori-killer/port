# @kaori-killer/port

A simple CLI tool for checking running ports and killing processes.

> [English](README.md) | [한국어](README.ko.md)

## Installation

### Global Installation (Recommended)

```bash
npm install -g @kaori-killer/port
```

### Local Installation

```bash
npm install @kaori-killer/port
```

After global installation, you can use the `port` command from anywhere.

## Usage

### List Ports

View all listening ports:

```bash
port ls
```

### Check Port

```bash
port check 3000
```

### Kill Process

```bash
port kill 3000
```

## Why Use port?

### Direct Commands vs port

| Task | Direct Command | port |
|------|---------------|------|
| List Ports | `lsof -i -P -n \| grep LISTEN` | `port ls` |
| Check Port | `lsof -i :3000 -P -n` | `port check 3000` |
| Kill Process | `lsof -ti :3000 \| xargs kill` | `port kill 3000` |

### Key Benefits

1. **Simple Commands**: Intuitive `port` commands instead of complex `lsof` syntax
2. **Readable Output**: Formatted tables instead of raw data
3. **Friendly Error Handling**: Clear messages when processes are not found
4. **Consistent Structure**: All operations follow the `port <action>` pattern
5. **Kill Confirmation**: Automatic confirmation messages after process termination

## Development

### Lint

```bash
npm run lint
```

### Auto-fix

```bash
npm run lint:fix
```

### Format

```bash
npm run format
```

### Run

```bash
npm start
```

## License

MIT
# port
