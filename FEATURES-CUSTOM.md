# Custom features added to llama.ui

Design is unchanged. New capabilities:

## Settings → Skills
- Super Programmer (on by default)
- 3D Modeling Expert
- Math Tutor, Code Reviewer, Hebrew Writer
- Enabled skills inject full instructions into the system message

## Settings → Agents
- Coding / Research / 3D CAD agents
- Apply sets system message; create custom agents

## Settings → Plugins
- GitHub with personal access token (PAT)
- Test whoami / list repos

## Providers
- **Bionic** at `http://localhost:1234`

## Tokens
- `showTokensPerSecond` enabled by default

## Usage
1. Settings → provider: Bionic or LM Studio → `http://localhost:1234`
2. Settings → Skills → enable what you need
3. Settings → Plugins → GitHub token
4. Chat as usual — design stays the same
