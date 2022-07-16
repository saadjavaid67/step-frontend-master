import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings/index';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/app">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/app">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};
