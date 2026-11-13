"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Menu, Moon, Search, ShoppingCart, Sun, X, Globe } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useCartStore, selectTotalItems } from "@/storage/cartStore";
import { Container } from "@/shared/ui/LayoutPrimitives";
import { IconButton } from "@/shared/ui/Button";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--color-surface) 92%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 4rem;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--color-primary);
  letter-spacing: 0.04em;
`;

const Nav = styled.nav`
  display: none;
  gap: 1rem;
  align-items: center;
  @media (min-width: 900px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  color: var(--color-text);
  font-weight: 500;
  &:hover { color: var(--color-accent); }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  inset-inline-end: -4px;
  min-width: 1.2rem;
  height: 1.2rem;
  padding: 0 0.25rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CartWrap = styled.div`
  position: relative;
`;

const SearchForm = styled.form`
  display: none;
  @media (min-width: 700px) {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex: 1;
    max-width: 420px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  color: var(--color-text);
  padding: 0 0.9rem;
`;

const MenuButton = styled(IconButton)`
  @media (min-width: 900px) {
    display: none;
  }
`;

const MobilePanel = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  border-top: 1px solid var(--color-border);
  padding: 0.75rem 0 1rem;
  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LangRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SmallButton = styled.button<{ $active?: boolean }>`
  border: 1px solid var(--color-border);
  background: ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-surface-alt)")};
  color: ${({ $active }) => ($active ? "#fff" : "var(--color-text)")};
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
`;

export function Header() {
  const t = useTranslations("Header");
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore(selectTotalItems);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const activeLocale = useLocale();

  const cartLabel = useMemo(() => `${t("cart")} (${totalItems})`, [t, totalItems]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
    setMenuOpen(false);
  };

  const switchLocale = (next: "fa" | "en") => {
    router.replace(pathname, { locale: next });
  };

  return (
    <Bar>
      <Container>
        <Row>
          <Brand href="/">
            <ShoppingCart size={20} color="var(--color-accent)" aria-hidden="true" />
            {t("brand")}
          </Brand>

          <SearchForm onSubmit={submitSearch} role="search">
            <label htmlFor="header-search" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
              {t("searchPlaceholder")}
            </label>
            <SearchInput
              id="header-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
            />
            <IconButton type="submit" aria-label={t("searchPlaceholder")}>
              <Search size={18} />
            </IconButton>
          </SearchForm>

          <Nav aria-label={t("home")}>
            <NavLink href="/">{t("home")}</NavLink>
            <NavLink href="/#products">{t("products")}</NavLink>
            <NavLink href="/#categories">{t("categories")}</NavLink>
          </Nav>

          <Actions>
            <IconButton
              type="button"
              onClick={toggleTheme}
              aria-label={t("changeTheme")}
              title={theme === "light" ? t("themeDark") : t("themeLight")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>

            <IconButton
              type="button"
              onClick={() => switchLocale(activeLocale === "fa" ? "en" : "fa")}
              aria-label={t("changeLanguage")}
              title={t("changeLanguage")}
            >
              <Globe size={18} />
            </IconButton>

            <CartWrap>
              <Link href="/cart" aria-label={cartLabel} title={t("cart")} style={{ display: "inline-flex" }}>
                <IconButton as="span" aria-hidden="true">
                  <ShoppingCart size={18} />
                </IconButton>
              </Link>
              {totalItems > 0 && <Badge aria-hidden="true">{totalItems}</Badge>}
            </CartWrap>

            <MenuButton
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </MenuButton>
          </Actions>
        </Row>

        <MobilePanel $open={menuOpen}>
          <MobileStack>
            <form onSubmit={submitSearch} role="search" style={{ display: "flex", gap: "0.5rem" }}>
              <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
              />
              <IconButton type="submit" aria-label={t("searchPlaceholder")}>
                <Search size={18} />
              </IconButton>
            </form>
            <MobileNav>
              <NavLink href="/" onClick={() => setMenuOpen(false)}>{t("home")}</NavLink>
              <NavLink href="/#products" onClick={() => setMenuOpen(false)}>{t("products")}</NavLink>
              <NavLink href="/#categories" onClick={() => setMenuOpen(false)}>{t("categories")}</NavLink>
              <NavLink href="/cart" onClick={() => setMenuOpen(false)}>{t("cart")}</NavLink>
            </MobileNav>
            <LangRow>
              <SmallButton type="button" $active={activeLocale === "fa"} onClick={() => { switchLocale("fa"); setMenuOpen(false); }}>
                {t("languageFa")}
              </SmallButton>
              <SmallButton type="button" $active={activeLocale === "en"} onClick={() => { switchLocale("en"); setMenuOpen(false); }}>
                {t("languageEn")}
              </SmallButton>
            </LangRow>
          </MobileStack>
        </MobilePanel>
      </Container>
    </Bar>
  );
}