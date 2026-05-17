'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { forwardRef, useCallback, type AnchorHTMLAttributes, type MouseEvent } from 'react';
import { smoothScrollTo } from '@/lib/smoothScrollTo';

const NAV_OFFSET = 96;

type SmoothLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

const isModifiedClick = (e: MouseEvent) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
const isNewTabTarget = (el: HTMLAnchorElement) =>
  el.target === '_blank' || el.hasAttribute('download');

const SmoothLink = forwardRef<HTMLAnchorElement, SmoothLinkProps>(function SmoothLink(
  { href, onClick, children, prefetch, replace, scroll, ...rest },
  ref,
) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (isModifiedClick(e)) return;
    if (isNewTabTarget(e.currentTarget)) return;
    if (!href.includes('#')) return;

    const [pathAndQuery, hashRaw = ''] = href.split('#');
    if (!hashRaw) return;
    const [targetPath = '', query = ''] = pathAndQuery.split('?');
    const currentSearch = typeof window !== 'undefined' ? window.location.search.slice(1) : '';
    const sameRoute =
      (targetPath === '' || targetPath === pathname) &&
      (query === '' || query === currentSearch);

    const idSegment = hashRaw.split('?')[0];
    let decoded = idSegment;
    try { decoded = decodeURIComponent(idSegment); } catch { /* keep raw */ }

    if (sameRoute) {
      e.preventDefault();
      const el = document.getElementById(decoded);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - NAV_OFFSET;
      smoothScrollTo(Math.max(0, targetY));
      const hashForUrl = '#' + hashRaw;
      if (window.location.hash !== hashForUrl) {
        window.history.pushState(null, '', hashForUrl);
      }
    } else {
      e.preventDefault();
      router.push(href, { scroll: false });
    }
  }, [href, onClick, pathname, router]);

  if (typeof href !== 'string' || !href.includes('#')) {
    return (
      <Link {...rest} href={href} prefetch={prefetch} replace={replace} scroll={scroll} onClick={onClick} ref={ref}>
        {children}
      </Link>
    );
  }

  return <a href={href} onClick={handleClick} ref={ref} {...rest}>{children}</a>;
});

export default SmoothLink;
