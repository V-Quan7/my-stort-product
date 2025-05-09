import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from '@/sanity/lib/live'
import { Product, ProductCategory } from '@/sanity.types'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getAllProducts = async () => {
  const query = `*[_type=="product"]`
  const products = await sanityFetch({ query: query })
  return products.data as Product[];
}
export async function getAllCategories() {
  const query = `*[_type=="productCategory"]`
  const products = await sanityFetch({ query: query })
  return products.data as ProductCategory[];
}

// // Hàm lấy một sản phẩm theo slug
export async function getCategoryBySlug(slug: string) {
  const query = `*[_type == "productCategory" && slug.current == $slug][0]`
  const products = await sanityFetch({ query: query, params: { slug } })
  return products.data as ProductCategory;
}

// // Hàm lấy tất cả các bài viết (nếu có thể)
export async function getProductsByCategorySlug(slug: string) {
  const query = `
    *[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug]._id)]`;
  const products = await sanityFetch({ query: query, params: { slug } });
  return products.data as Product[]; // 
}
export const getProductById = async (id: string) => {
  const query = `* [_type =="product"&&_id == $id][0]`;
  const product = await sanityFetch({ query: query, params: { id } });
  return product.data as Product;
}

export const searchProducts = async (searchQuery: string) => {
  const query = `*[_type == "product"&& (
  title match "*"+ $searchQuery +"*"  ||
  description match "*"+  $searchQuery +"*" ||
  category->title match "*"+  $searchQuery +"*"||
  category->slug.current match "*"+ $searchQuery +"*"
  )]`;
  const products = await sanityFetch({ query: query, params: { searchQuery } });
  return products.data as Product[];
}