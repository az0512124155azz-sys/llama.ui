import { useEffect, useState } from 'react';
import { SettingsSectionLabel } from '../components';
import { Button } from '../../../components';
import { loadSkills, saveSkills } from '../../../features/skills/storage';
import { SkillDef } from '../../../features/skills/defaults';
import { SettingsTabViewProps } from '../types';

export function SkillsSettingsView(_props: SettingsTabViewProps) {
  const [skills, setSkills] = useState<SkillDef[]>([]);

  useEffect(() => {
    setSkills(loadSkills());
  }, []);

  const toggle = (id: string) => {
    const next = skills.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    setSkills(next);
    saveSkills(next);
  };

  const reset = () => {
    localStorage.removeItem('llama-ui-skills-v1');
    const d = loadSkills();
    setSkills(d);
    saveSkills(d);
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsSectionLabel>
        Skills (system instructions injected into chat)
      </SettingsSectionLabel>
      <p className="text-sm opacity-70">
        Enable skills to inject their full instructions into the system message.
        Design is unchanged — only behavior.
      </p>
      <div className="flex flex-col gap-2">
        {skills.map((s) => (
          <label
            key={s.id}
            className="flex items-start gap-3 p-3 rounded-xl border border-base-300 bg-base-200/40"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-sm mt-1"
              checked={s.enabled}
              onChange={() => toggle(s.id)}
            />
            <span className="flex flex-col gap-1 min-w-0">
              <span className="font-medium">{s.name}</span>
              <span className="text-xs opacity-70">{s.description}</span>
            </span>
          </label>
        ))}
      </div>
      <Button className="btn btn-ghost btn-sm self-start" onClick={reset}>
        Reset skills to defaults
      </Button>
    </div>
  );
}
