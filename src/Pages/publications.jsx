// src/Pages/Publications.jsx
import React, { useState } from 'react';
import publications from '../data/publications';

const Publications = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Extract unique keywords
  const allKeywords = [...new Set(publications.flatMap(pub => pub.keywords))];
  const allTypes = [...new Set(publications.map(pub => pub.type))];
  
  // Filtered publications based on selected keywords
  const filtered = publications.filter(pub => {
    const keywordMatch =
      selectedKeywords.length === 0 || selectedKeywords.some(keyword => pub.keywords.includes(keyword));
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(pub.type);
    return keywordMatch && typeMatch;
  });

  // Group filtered publications by year
  const pubsByYear = filtered.reduce((acc, pub) => {
    acc[pub.year] = acc[pub.year] || [];
    acc[pub.year].push(pub);
    return acc;
  }, {});

  // Sort years descending
  const sortedYears = Object.keys(pubsByYear).sort((a, b) => b - a);

  const handleKeywordClick = (keyword) => {
    setSelectedKeywords((prevSelected) => {
      return prevSelected.includes(keyword)
        ? prevSelected.filter(k => k !== keyword)
        : [...prevSelected, keyword];
    });
  };
  
  const handleTypeClick = (type) => {
    setSelectedTypes((prevSelected) => {
      return prevSelected.includes(type)
        ? prevSelected.filter(t => t !== type)
        : [...prevSelected, type];
    });
  };

  return (
    <div>
      <h1>Publications</h1>
      {/* Keyword Filter */}
      <div style={{ marginBottom: '1rem' }}>
        {/* Type Filter */}
        <strong>Filter by type:</strong><br />
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeClick(type)}
            className={`button ${selectedTypes.includes(type) ? 'selected' : 'deselected'}`}
          >
            {type}
          </button>
        ))}
        <br /><br />

        {/* Keyword Filter */}
        <strong>Filter by keyword:</strong><br />
        {allKeywords.map((keyword) => (
          <button
            key={keyword}
            onClick={() => handleKeywordClick(keyword)}
            className={`button ${selectedKeywords.includes(keyword) ? 'selected' : 'deselected'}`}
          >
            {keyword}
          </button>
        ))}
      </div>
      <br />

      {/* Grouped Publication List */}
      {sortedYears.map((year) => (
        <div key={year}>
          <h3>{year}</h3>
          <ul>
            {pubsByYear[year].map((pub, index) => (
              <li key={index}>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#329696' }}
                >
                  <strong>{pub.title}</strong>
                </a><br />
                <small>{pub.authors}</small><br />
                <small>{pub.source}</small><br />
                <br />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Publications;
