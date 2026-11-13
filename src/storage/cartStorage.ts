export const CART_STORAGE_KEY = "nova-cart";

export interface StoredCartItem {
  productId: number;
  quantity: number;
}

export function getStoredCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is StoredCartItem =>
        typeof item === "object" &&
        item !== null &&
        "productId" in item &&
        "quantity" in item &&
        typeof (item as { productId: unknown }).productId === "number" &&
        typeof (item as { quantity: unknown }).quantity === "number" &&
        (item as { quantity: number }).quantity > 0
    );
  } catch {
    return [];
  }
}

export function setStoredCart(items: StoredCartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}
