import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? null : (
        <h3>
          <Link to="/app/dashboard">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};
