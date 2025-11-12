/**
 * Generate installation commands that automatically use the deployed site URL
 * This ensures install commands are always in sync with where the site is deployed
 */

export function getInstallCommand(component: string): string {
  // Use NEXT_PUBLIC_SITE_URL if set, otherwise use Vercel URL, otherwise localhost
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== 'undefined'
      ? window.location.origin
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')

  return `npx shadcn@latest add ${siteUrl}/registry/${component}.json`
}

/**
 * Get the site's base URL
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}
