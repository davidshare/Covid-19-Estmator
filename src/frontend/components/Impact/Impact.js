import React from 'react';

import './Impact.scss';

const Impact = ({ impact }) => {
  return (
    <ul className="impact-list container">
      {impact.map((item) => {
        const key = Object.keys(item)[0];
        return (
          <li key={key} className="impact-item">
            <span className="description">{key} :</span>
            <span className="value">{item[key]}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Impact;
