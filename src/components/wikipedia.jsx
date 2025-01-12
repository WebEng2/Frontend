import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import {
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  List,
  ListItem,
  Icon,
} from 'framework7-react';

function WikipediaArticles({ searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleContent, setArticleContent] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 10;

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchArticles() {
      setLoading(true);
      setError(null);

      const offset = currentPage * articlesPerPage;
      const apiUrl = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=${articlesPerPage}&srsearch=${searchQuery}&sroffset=${offset}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching Wikipedia articles: ${response.status}`);
        }

        const data = await response.json();
        const searchResults = data?.query?.search || [];
        const totalHits = data?.query?.searchinfo?.totalhits || 0;

        setArticles(searchResults.map((item) => ({
          title: item.title,
          pageid: item.pageid,
          wordcount: item.wordcount,
          timestamp: item.timestamp,
        })));

        setPageCount(Math.ceil(totalHits / articlesPerPage));

        // Cache the response
        if ('caches' in window) {
          const cache = await caches.open('pwa-cache-v1');
          await cache.put(apiUrl, new Response(JSON.stringify(data)));
          console.log("Wikipedia articles cached successfully");
        }
      } catch (err) {
        console.error("Error fetching Wikipedia articles:", err.message);

        // Try to get data from cache
        if ('caches' in window) {
          const cache = await caches.open('pwa-cache-v1');
          const cachedResponse = await cache.match(apiUrl);
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            console.log("Serving cached Wikipedia articles:", cachedData);
            const searchResults = cachedData?.query?.search || [];
            const totalHits = cachedData?.query?.searchinfo?.totalhits || 0;

            setArticles(searchResults.map((item) => ({
              title: item.title,
              pageid: item.pageid,
              wordcount: item.wordcount,
              timestamp: item.timestamp,
            })));

            setPageCount(Math.ceil(totalHits / articlesPerPage));
          } else {
            setError('No cached articles available and failed to fetch new articles.');
          }
        } else {
          setError('Failed to fetch articles and caching is not supported.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (!selectedArticle) return;

    async function fetchArticleContent() {
      setLoading(true);
      setArticleContent('');
      const contentUrl = `https://de.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&format=json&origin=*&pageids=${selectedArticle.pageid}`;

      try {
        const response = await fetch(contentUrl);
        if (!response.ok) {
          throw new Error(`Error fetching article content: ${response.status}`);
        }

        const data = await response.json();
        const content = data?.query?.pages[selectedArticle.pageid]?.extract || '';
        setArticleContent(content);

        // Cache the response
        if ('caches' in window) {
          const cache = await caches.open('pwa-cache-v1');
          await cache.put(contentUrl, new Response(JSON.stringify(data)));
          console.log("Wikipedia article content cached successfully");
        }
      } catch (err) {
        console.error("Error fetching article content:", err.message);

        // Try to get data from cache
        if ('caches' in window) {
          const cache = await caches.open('pwa-cache-v1');
          const cachedResponse = await cache.match(contentUrl);
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            console.log("Serving cached Wikipedia article content:", cachedData);
            const content = cachedData?.query?.pages[selectedArticle.pageid]?.extract || '';
            setArticleContent(content);
          } else {
            setError('No cached article content available and failed to fetch new content.');
          }
        } else {
          setError('Failed to fetch article content and caching is not supported.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchArticleContent();
  }, [selectedArticle]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="wiki-articles">
      {loading && <p style={{ margin: '16px' }}>Loading articles...</p>}
      {error && <p className="error">{error}</p>}
      {articles.length > 0 ? (
        <List>
          {articles.map((article) => (
            <ListItem
              key={article.pageid}
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
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
            </ListItem>
          ))}
        </List>
      ) : (
        !loading && <div style={{ margin: '16px' }}>No articles found</div>
      )}

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={
            <Icon
            f7="arrowtriangle_left"
            style={{ marginLeft: 'auto', fontSize: '18px' }}
          />
          }
          nextLabel={
            <Icon
              f7="arrowtriangle_right"
              style={{ marginLeft: 'auto', fontSize: '18px' }}
            />
          }
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}

      {selectedArticle && (
        <Popup
          opened={!!selectedArticle}
          onPopupClosed={() => setSelectedArticle(null)}
        >
          <Page>
            <Navbar style={{whiteSpace: 'normal'}} title={selectedArticle.title}>
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <div className="article-details" style={{ padding: '16px' }}>
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
                }}
              />
              <a
                href={`https://de.wikipedia.org/wiki/${encodeURIComponent(
                  selectedArticle.title
                )}`}
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
  );
}

export default WikipediaArticles;