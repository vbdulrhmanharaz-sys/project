import { useContext, useState } from "react";
import { FiArrowUpRight, FiBookmark, FiBookOpen, FiCheck, FiClock, FiSearch, FiX } from "react-icons/fi";
import { userContext } from "./context/UserContext";

const articles = [
  { id: 1, category: "Attention", read: "06 min read", title: "The gentle power of a blank page", intro: "Why making space is sometimes the most productive thing you can do.", body: "A blank page is not empty. It is an invitation to slow down, notice what matters, and begin without needing the perfect answer.", color: "sage" },
  { id: 2, category: "Making", read: "04 min read", title: "Build a smaller, better ritual", intro: "The habits that last are usually the ones that leave room for real life.", body: "The best rituals do not ask for a new personality. They make the next useful action easier to find inside the day you already have.", color: "coral" },
  { id: 3, category: "Perspective", read: "08 min read", title: "A case for curious wandering", intro: "You do not always need a destination to find something valuable.", body: "Wandering is a way of letting unexpected connections surface. Follow the thread a little further and see where it leads.", color: "blue" },
  { id: 4, category: "Attention", read: "05 min read", title: "Put your phone down gently", intro: "Attention is not a switch. It is a space you can practice returning to.", body: "Small boundaries work better than dramatic rules. Start with one quiet pocket of time and let it become yours.", color: "yellow" },
];

export default function Blogs() {
  const { userData } = useContext(userContext);
  const displayName = userData?.name || "curious mind";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("noura-saved-articles") || "[]"));
  const [selectedArticle, setSelectedArticle] = useState(null);
  const categories = ["All", ...new Set(articles.map((article) => article.category))];
  const visibleArticles = articles.filter((article) => {
    const matchesCategory = category === "All" || article.category === category;
    const matchesSearch = `${article.title} ${article.intro}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSaved = (articleId) => {
    const next = saved.includes(articleId) ? saved.filter((id) => id !== articleId) : [...saved, articleId];
    setSaved(next);
    localStorage.setItem("noura-saved-articles", JSON.stringify(next));
  };

  return (
    <div className="page-shell journal-page">
      <div className="page-heading reveal"><div><p className="eyebrow">The journal</p><h1>Ideas worth<br />keeping close.</h1></div><p className="content-copy">A small reading list for {displayName}: notes on attention, making, and the art of noticing.</p></div>
      <article className="surface blog-panel reveal-side"><span className="feature-icon"><FiBookOpen /></span><div><p className="eyebrow">Featured note · 06 min read</p><h2>The gentle power of a blank page</h2><p>Why making space is sometimes the most productive thing you can do.</p></div><button className="primary-action" onClick={() => setSelectedArticle(articles[0])}>Read note <FiArrowUpRight /></button></article>
      <div className="journal-toolbar"><div className="journal-search"><FiSearch /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the journal..." aria-label="Search the journal" /></div><div className="journal-filters">{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
      <div className="journal-grid stagger-grid">{visibleArticles.map((article) => <article className="journal-card surface" key={article.id}><div className={`journal-card-art ${article.color}`}><span>{article.category}</span><button className={saved.includes(article.id) ? "saved" : ""} onClick={() => toggleSaved(article.id)} aria-label="Save article"><FiBookmark /></button><FiBookOpen /></div><div className="journal-card-body"><p className="journal-read"><FiClock /> {article.read}</p><h2>{article.title}</h2><p>{article.intro}</p><div><button className="product-link" onClick={() => setSelectedArticle(article)}>Read article <FiArrowUpRight /></button>{saved.includes(article.id) && <span className="saved-label"><FiCheck /> Saved</span>}</div></div></article>)}</div>
      {!visibleArticles.length && <div className="empty-products surface">No journal notes match your search.</div>}
      {selectedArticle && <div className="article-overlay" role="dialog" aria-modal="true"><article className="article-modal surface"><button className="icon-button article-close" onClick={() => setSelectedArticle(null)} aria-label="Close article"><FiX /></button><p className="eyebrow">{selectedArticle.category} · {selectedArticle.read}</p><h2>{selectedArticle.title}</h2><p className="article-modal-intro">{selectedArticle.intro}</p><div className="article-rule" /><p>{selectedArticle.body}</p><p>Keep this idea close and return to it whenever your attention needs a softer place to land.</p></article></div>}
    </div>
  );
}
