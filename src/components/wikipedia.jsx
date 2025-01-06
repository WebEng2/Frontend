import React, { useState, useEffect } from 'react'
import {
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  List,
  ListItem,
  Icon,
  Button,
} from 'framework7-react'

function WikipediaArticles({ searchQuery }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [articleContent, setArticleContent] = useState('')
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    if (!searchQuery) return

    async function fetchArticles() {
      setLoading(true)
      setError(null)
      try {
        const apiUrl = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}&page=${page}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(
            `Error fetching Wikipedia articles: ${response.status}`
          )
        }

        const data = await response.json()
        const searchResults = data?.query?.search || []
        const continueData = data?.continue

        setArticles((prevArticles) => [
          ...prevArticles,
          ...searchResults.map((item) => ({
            title: item.title,
            pageid: item.pageid,
            wordcount: item.wordcount,
            timestamp: item.timestamp,
          })),
        ])

        setHasNextPage(!!continueData) 
      } catch (err) {
        setError(err.message || 'Failed to fetch articles.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [searchQuery, page]) // Fetch articles whenever searchQuery or page changes

  useEffect(() => {
    if (!selectedArticle) return

    async function fetchArticleContent() {
      setLoading(true)
      setArticleContent('') // Clear previous content while fetching new
      try {
        const contentUrl = `https://de.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&format=json&origin=*&pageids=${selectedArticle.pageid}`
        const response = await fetch(contentUrl)

        if (!response.ok) {
          throw new Error(
            `Error fetching article content: ${response.status}`
          )
        }

        const data = await response.json()
        const articleContent =
          data?.query?.pages[selectedArticle.pageid]?.extract || ''
        console.log('Article Content:', articleContent)

        setArticleContent(articleContent)
      } catch (err) {
        setError(err.message || 'Failed to fetch article content.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticleContent()
  }, [selectedArticle])

  const handleLoadMore = () => {
    if (hasNextPage) {
      setPage(page + 1)
    }
  }

  return (
    <div className="wiki-articles">
      {loading && <p>Loading articles...</p>}
      {error && <p className="error">{error}</p>}
      {articles.length > 0 ? (
        <List>
          {articles.map((article) => (
            <ListItem
              key={`${article.pageid}-${article.title}-${Math.random()}`}
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              {/* Article Title with Wikipedia Icon */}
              <Link
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '8px 0',
                }}
                onClick={() => setSelectedArticle(article)}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png"
                  alt="Wikipedia"
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '8px',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                >
                  {article.title}
                </span>
              </Link>

              {/* Right Arrow Icon */}
              <Icon
                f7="arrowtriangle_right"
                style={{ marginLeft: 'auto', fontSize: '18px' }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        !loading && (
          <div style={{ margin: '16px' }}>No articles found</div>
        )
      )}

      {/* Pagination Button */}
      {hasNextPage && (
        <Button
          fill
          raised
          style={{ margin: '32px' }}
          onClick={handleLoadMore}
        >
          Load More Articles
        </Button>
      )}

      {/* Popup for Article Details */}
      {selectedArticle && (
        <Popup
          opened={!!selectedArticle}
          onPopupClosed={() => setSelectedArticle(null)}
        >
          <Page>
            <Navbar title={selectedArticle.title}>
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <div
              className="article-details"
              style={{ padding: '16px' }}
            >
              {loading && <p>Loading article content...</p>}
              <div
                className="article-content"
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  whiteSpace: 'normal',
                }}
                dangerouslySetInnerHTML={{
                  __html: articleContent,
                }} // Display article content
              />
              <a
                href={`https://de.wikipedia.org/wiki/${encodeURIComponent(selectedArticle.title)}`}
                target="_system"
                className="external"
              >
                View Full Article on Wikipedia
              </a>
            </div>
          </Page>
        </Popup>
      )}
    </div>
  )
}

export default WikipediaArticles
