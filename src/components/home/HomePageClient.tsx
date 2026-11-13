"use client";

import { useMemo, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { getCategories, getProducts } from "@/requests/products";
import { queryKeys } from "@/utils/queryKeys";
import type { SortOption } from "@/types";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCard } from "@/components/products/ProductCard";
import { Container, Section, SectionTitle } from "@/shared/ui/LayoutPrimitives";
import { Input, Select, Label } from "@/shared/ui/Inputs";
import { Button } from "@/shared/ui/Button";
import { EmptyState, ErrorState, LoadingState } from "@/shared/ui/States";

const PAGE_SIZE = 6;

const FiltersGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.25rem;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1.2fr 1fr 1fr auto;
    align-items: end;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-border)")};
  background: ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-surface)")};
  color: ${({ $active }) => ($active ? "#fff" : "var(--color-text)")};
  border-radius: 999px;
  padding: 0.45rem 0.85rem;
  cursor: pointer;
  font-size: 0.9rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  @media (min-width: 520px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0 1rem;
  flex-wrap: wrap;
  color: var(--color-text-muted);
`;

const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

export function HomePageClient({ locale }: { locale: string }) {
  const t = useTranslations("Home");
  const tc = useTranslations("Common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const sort = (searchParams.get("sort") ?? "default") as SortOption;
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const productsQuery = useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: getProducts,
  });
  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: getCategories,
  });

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === "" || v === "all" || v === "default") params.delete(k);
      else params.set(k, v);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = productsQuery.data ?? [];
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(needle));
    }
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return sorted;
  }, [productsQuery.data, q, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) updateParams({ page: String(totalPages) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages]);

  const clearFilters = () => router.replace(pathname, { scroll: false });

  return (
    <>
      <HeroSection />

      <Section id="categories">
        <Container>
          <SectionTitle>{t("categoriesTitle")}</SectionTitle>
          {categoriesQuery.isLoading ? (
            <LoadingState message={tc("loadingCategories")} />
          ) : categoriesQuery.isError ? (
            <ErrorState
              title={tc("errorTitle")}
              message={tc("errorDescription")}
              retryLabel={tc("retry")}
              onRetry={() => categoriesQuery.refetch()}
            />
          ) : (
            <Chips role="group" aria-label={t("categoriesTitle")}>
              <Chip
                type="button"
                $active={category === "all"}
                onClick={() => updateParams({ category: "all", page: "1" })}
              >
                {t("allCategories")}
              </Chip>
              {(categoriesQuery.data ?? []).map((cat) => (
                <Chip
                  key={cat}
                  type="button"
                  $active={category === cat}
                  onClick={() => updateParams({ category: cat, page: "1" })}
                >
                  {cat}
                </Chip>
              ))}
            </Chips>
          )}
        </Container>
      </Section>

      <Section id="products">
        <Container>
          <SectionTitle>{t("productsTitle")}</SectionTitle>

          <FiltersGrid>
            <div>
              <Label htmlFor="search">{t("searchLabel")}</Label>
              <Input
                id="search"
                value={q}
                onChange={(e) => updateParams({ q: e.target.value, page: "1" })}
                placeholder={t("searchPlaceholder")}
              />
            </div>
            <div>
              <Label htmlFor="category-select">{t("categoriesTitle")}</Label>
              <Select
                id="category-select"
                value={category}
                onChange={(e) => updateParams({ category: e.target.value, page: "1" })}
              >
                <option value="all">{t("allCategories")}</option>
                {(categoriesQuery.data ?? []).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="sort">{t("sortLabel")}</Label>
              <Select
                id="sort"
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value, page: "1" })}
              >
                <option value="default">{t("sortDefault")}</option>
                <option value="price-asc">{t("sortPriceAsc")}</option>
                <option value="price-desc">{t("sortPriceDesc")}</option>
                <option value="title-asc">{t("sortTitleAsc")}</option>
                <option value="title-desc">{t("sortTitleDesc")}</option>
              </Select>
            </div>
            <div>
              <Label as="span" style={{ visibility: "hidden" }}>.</Label>
              <Button type="button" $variant="ghost" onClick={clearFilters} $full>
                {t("clearFilters")}
              </Button>
            </div>
          </FiltersGrid>

          {productsQuery.isLoading ? (
            <LoadingState message={tc("loadingProducts")} />
          ) : productsQuery.isError ? (
            <ErrorState
              title={tc("errorTitle")}
              message={tc("errorDescription")}
              retryLabel={tc("retry")}
              onRetry={() => productsQuery.refetch()}
            />
          ) : (
            <>
              <Toolbar>
                <span>{t("resultsCount", { count: filtered.length })}</span>
              </Toolbar>

              {filtered.length === 0 ? (
                <EmptyState message={t("emptyProducts")} />
              ) : (
                <>
                  <Grid>
                    {paged.map((product) => (
                      <ProductCard key={product.id} product={product} locale={locale} />
                    ))}
                  </Grid>
                  {totalPages > 1 && (
                    <Pagination aria-label="Pagination">
                      <Button
                        type="button"
                        $variant="secondary"
                        onClick={() => updateParams({ page: String(Math.max(1, safePage - 1)) })}
                        disabled={safePage <= 1}
                      >
                        {tc("previous")}
                      </Button>
                      <span>{tc("page", { current: safePage, total: totalPages })}</span>
                      <Button
                        type="button"
                        $variant="secondary"
                        onClick={() => updateParams({ page: String(Math.min(totalPages, safePage + 1)) })}
                        disabled={safePage >= totalPages}
                      >
                        {tc("next")}
                      </Button>
                    </Pagination>
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </Section>
    </>
  );
}