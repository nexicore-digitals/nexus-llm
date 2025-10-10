import { ModelName } from './models/models';

export type ContributorSkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Contributor {
  id: string;
  skillLevel?: ContributorSkillLevel;
  secretBadge?: boolean;
  preferredModel?: ModelName;
  reviewHistory?: string[];
  memory?: {
    lastUsedPlugin?: string;
    lastSchema?: string;
  };
}
