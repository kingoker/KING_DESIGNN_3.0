// composables/useBlog.ts
import { ref, reactive, computed } from 'vue'
import { useSupabase } from './useSupabase'

interface Category {
  id: number
  name_ru: string
}

interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  cover_url: string
  published_at: string
  category_ids: number[]
  content_markdown: string
  slug_manually?: boolean
}

export function useBlog() {
  const supabase = useSupabase()
  const categories = ref<Category[]>([])
  const articles = ref<Article[]>([])
  const loading = ref(true)
  const filters = reactive({ search: '', category: '', date: '' })

  const CHAR_MAP: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo',
    ж: 'zh', з: 'z', и: 'i', й: 'j', к: 'k', л: 'l', м: 'm',
    н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
    ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '',
    ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
  }

  const slugify = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .split('')
      .map(ch => CHAR_MAP[ch] ?? ch)
      .join('')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/\-+/g, '-')
  }

  const filteredArticles = computed(() =>
    articles.value
      .filter(a => {
        const matchTitle = a.title.toLowerCase().includes(filters.search.toLowerCase())
        const matchCat = !filters.category || a.category_ids.includes(+filters.category)
        const matchDate = !filters.date || a.published_at.slice(0, 10) === filters.date
        return matchTitle && matchCat && matchDate
      })
      .sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at))
  )

  async function loadData() {
    loading.value = true
    try {
      const [cRes, aRes, acRes] = await Promise.all([
        supabase.from('categories').select('id,name_ru'),
        supabase.from('articles').select('id,title,slug,excerpt,cover_url,published_at,content_markdown'),
        supabase.from('article_categories').select('article_id,category_id')
      ])

      if (cRes.error) throw new Error(cRes.error.message)
      if (aRes.error) throw new Error(aRes.error.message)
      if (acRes.error) throw new Error(acRes.error.message)

      categories.value = cRes.data || []
      
      const catMap = (acRes.data || []).reduce((m, r) => {
        (m[r.article_id] ||= []).push(r.category_id)
        return m
      }, {} as Record<number, number[]>)

      articles.value = (aRes.data || []).map(a => ({
        ...a,
        published_at: new Date(a.published_at).toISOString().slice(0, 16),
        category_ids: catMap[a.id] || [],
        slug_manually: false
      }))
    } catch (error) {
      console.error('Load data error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateArticle(article: Article) {
    try {
      const { error: ue } = await supabase
        .from('articles')
        .update({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          cover_url: article.cover_url,
          published_at: new Date(article.published_at).toISOString(),
          content_markdown: article.content_markdown,
          updated_at: new Date().toISOString()
        })
        .eq('id', article.id)

      if (ue) throw new Error(ue.message)

      await supabase
        .from('article_categories')
        .delete()
        .eq('article_id', article.id)

      if (article.category_ids.length) {
        const { error: ie } = await supabase
          .from('article_categories')
          .insert(article.category_ids.map(cid => ({ 
            article_id: article.id, 
            category_id: cid 
          })))
        
        if (ie) throw new Error(ie.message)
      }

      await loadData()
      return true
    } catch (error) {
      console.error('Update article error:', error)
      throw error
    }
  }

  async function deleteArticle(id: number) {
    try {
      await supabase.from('article_categories').delete().eq('article_id', id)
      await supabase.from('articles').delete().eq('id', id)
      articles.value = articles.value.filter(x => x.id !== id)
      return true
    } catch (error) {
      console.error('Delete article error:', error)
      throw error
    }
  }

  async function createArticle(article: Omit<Article, 'id'>) {
    try {
      const { data, error: ie } = await supabase
        .from('articles')
        .insert([{
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          cover_url: article.cover_url,
          published_at: new Date(article.published_at).toISOString(),
          content_markdown: article.content_markdown
        }])
        .select('id')
        .single()

      if (ie || !data) throw new Error(ie?.message)

      if (article.category_ids.length) {
        const { error } = await supabase
          .from('article_categories')
          .insert(article.category_ids.map(cid => ({ 
            article_id: data.id, 
            category_id: cid 
          })))
        
        if (error) throw new Error(error.message)
      }

      await loadData()
      return data.id
    } catch (error) {
      console.error('Create article error:', error)
      throw error
    }
  }

  return {
    categories,
    articles,
    loading,
    filters,
    filteredArticles,
    slugify,
    loadData,
    updateArticle,
    deleteArticle,
    createArticle
  }
}