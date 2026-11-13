import { apiClient } from "@/api/axios";
import type { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>("/products");
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await apiClient.get<string[]>("/products/categories");
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}
