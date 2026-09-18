import { DEFAULT_SKILLS, SkillDef } from './defaults';

const KEY = 'llama-ui-skills-v1';

export function loadSkills(): SkillDef[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SKILLS.map((s) => ({ ...s }));
    const parsed = JSON.parse(raw) as SkillDef[];
    if (!Array.isArray(parsed) || !parsed.length) {
      return DEFAULT_SKILLS.map((s) => ({ ...s }));
    }
    const byId = new Map(parsed.map((s) => [s.id, s]));
    for (const d of DEFAULT_SKILLS) {
      if (!byId.has(d.id)) byId.set(d.id, { ...d });
    }
    return Array.from(byId.values());
  } catch {
    return DEFAULT_SKILLS.map((s) => ({ ...s }));
  }
}

export function saveSkills(skills: SkillDef[]) {
  localStorage.setItem(KEY, JSON.stringify(skills));
}
