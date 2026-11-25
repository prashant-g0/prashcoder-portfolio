import type { Projects } from "@/data/prash/projects";

export function getLatestProjects(projects: Projects[], limit = 3): Projects[] {
  return [...projects].sort((a, b) => b.id - a.id).slice(0, limit);
}
