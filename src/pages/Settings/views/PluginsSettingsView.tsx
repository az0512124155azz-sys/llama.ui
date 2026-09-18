import { useEffect, useState } from 'react';
import { SettingsSectionLabel } from '../components';
import { Button } from '../../../components';
import {
  githubListRepos,
  githubWhoAmI,
  loadPlugins,
  savePlugins,
  PluginConfig,
} from '../../../features/plugins/storage';
import { SettingsTabViewProps } from '../types';

export function PluginsSettingsView(_props: SettingsTabViewProps) {
  const [cfg, setCfg] = useState<PluginConfig>({
    githubToken: '',
    githubEnabled: false,
  });
  const [out, setOut] = useState('');

  useEffect(() => {
    setCfg(loadPlugins());
  }, []);

  const persist = (next: PluginConfig) => {
    setCfg(next);
    savePlugins(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsSectionLabel>Plugins</SettingsSectionLabel>
      <p className="text-sm opacity-70">
        Token-based plugins (not OAuth). Never paste tokens in chat — only here.
      </p>
      <div className="p-3 rounded-xl border border-base-300 bg-base-200/40 flex flex-col gap-3">
        <div className="font-medium">GitHub</div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={cfg.githubEnabled}
            onChange={(e) =>
              persist({ ...cfg, githubEnabled: e.target.checked })
            }
          />
          Enabled
        </label>
        <input
          type="password"
          className="input input-bordered input-sm w-full"
          placeholder="GitHub PAT (ghp_...)"
          value={cfg.githubToken}
          onChange={(e) => persist({ ...cfg, githubToken: e.target.value })}
          autoComplete="off"
        />
        <div className="flex gap-2 flex-wrap">
          <Button
            className="btn btn-sm btn-outline"
            onClick={async () => {
              if (!cfg.githubToken) {
                setOut('Set a token first');
                return;
              }
              setOut(await githubWhoAmI(cfg.githubToken));
            }}
          >
            Test whoami
          </Button>
          <Button
            className="btn btn-sm btn-outline"
            onClick={async () => {
              if (!cfg.githubToken) {
                setOut('Set a token first');
                return;
              }
              setOut(await githubListRepos(cfg.githubToken));
            }}
          >
            List repos
          </Button>
        </div>
        {out && (
          <pre className="text-xs whitespace-pre-wrap bg-base-100 p-2 rounded-lg max-h-48 overflow-auto">
            {out}
          </pre>
        )}
      </div>
    </div>
  );
}
