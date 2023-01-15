import axios from 'axios'
import useSWR from 'swr'

const qiitaClient = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
  },
})

export const qiitaFetcher = async (url: string) => {
  return qiitaClient.get(url).then((res) => res.data)
}

type QiitaPosts = {
  title: string
  created_at: string
  url: string
  tags: [{ name: string }]
}[]

export function useQiitaPosts() {
  const { data, error, isLoading } = useSWR<QiitaPosts, Error>(
    'https://qiita.com/api/v2/authenticated_user/items',
    qiitaFetcher
  )

  return {
    qiitaPosts: data,
    isLoading,
    error: error,
  }
}
