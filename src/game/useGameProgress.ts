import { useCallback, useEffect, useMemo, useState } from "react";
import {
  achievements,
  LEVEL_XP,
  VISIT_XP,
  type LocationId,
} from "@/data/portfolio";
import { sounds } from "@/lib/sounds";

const SAVE_KEY = "tawa-pixel-portfolio-save-v1";

type Save = {
  xp: number;
  visited: LocationId[];
  unlocked: string[];
  muted: boolean;
};

function loadSave(): Save {
  const fallback: Save = { xp: 0, visited: [], unlocked: [], muted: false };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<Save>;
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      visited: Array.isArray(parsed.visited) ? (parsed.visited as LocationId[]) : [],
      unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
      muted: parsed.muted === true,
    };
  } catch {
    return fallback;
  }
}

export type Toast = { id: number; title: string; body: string };

export function useGameProgress() {
  const [save, setSave] = useState<Save>(loadSave);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    sounds.muted = save.muted;
    try {
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch {
      // storage unavailable — game still works for the session
    }
  }, [save]);

  const pushToast = useCallback((title: string, body: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, body }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  const unlock = useCallback(
    (id: string) => {
      setSave((s) => {
        if (s.unlocked.includes(id)) return s;
        const ach = achievements.find((a) => a.id === id);
        if (!ach) return s;
        sounds.play("achievement");
        pushToast(`Achievement unlocked: ${ach.name}`, `${ach.description} · +${ach.xp} XP`);
        return { ...s, xp: s.xp + ach.xp, unlocked: [...s.unlocked, id] };
      });
    },
    [pushToast],
  );

  const visit = useCallback(
    (loc: LocationId) => {
      setSave((s) => {
        if (s.visited.includes(loc)) return s;
        const visited = [...s.visited, loc];
        return { ...s, xp: s.xp + VISIT_XP, visited };
      });
      const locAch: Partial<Record<LocationId, string>> = {
        about: "lore-master",
        skills: "skill-seeker",
        projects: "project-inspector",
        certificates: "certified",
        contact: "networker",
      };
      unlock("curious");
      const specific = locAch[loc];
      if (specific) unlock(specific);
      // explorer check runs against the post-visit set
      setSave((s) => {
        if (s.visited.length >= 5 && !s.unlocked.includes("explorer")) {
          const ach = achievements.find((a) => a.id === "explorer");
          if (ach) {
            sounds.play("levelup");
            pushToast(`Achievement unlocked: ${ach.name}`, `${ach.description} · +${ach.xp} XP`);
          }
          return { ...s, xp: s.xp + 50, unlocked: [...s.unlocked, "explorer"] };
        }
        return s;
      });
    },
    [unlock, pushToast],
  );

  const markMoved = useCallback(() => unlock("first-steps"), [unlock]);
  const markResume = useCallback(() => unlock("resume-hunter"), [unlock]);

  const toggleMute = useCallback(() => {
    setSave((s) => ({ ...s, muted: !s.muted }));
  }, []);

  const level = Math.floor(save.xp / LEVEL_XP) + 1;
  const levelProgress = ((save.xp % LEVEL_XP) / LEVEL_XP) * 100;

  return useMemo(
    () => ({
      xp: save.xp,
      level,
      levelProgress,
      visited: save.visited,
      unlocked: save.unlocked,
      muted: save.muted,
      toasts,
      visit,
      unlock,
      markMoved,
      markResume,
      toggleMute,
    }),
    [save, level, levelProgress, toasts, visit, unlock, markMoved, markResume, toggleMute],
  );
}
