import { RouterContext } from '../types/router';

/**
 * Checks if the current context has premium access.
 *
 * Per the roadmap, this is determined by:
 * - Phase 2: `contributor.secretBadge === true`
 * - Phase 3: `account.isPremium === true` (future)
 *
 * @param context The router context.
 * @returns `true` if the user has premium access, `false` otherwise.
 */
export function hasPremiumAccess(context?: RouterContext): boolean {
  // For now, access is granted if the contributor has the secret badge.
  return context?.contributor?.secretBadge === true;
}
