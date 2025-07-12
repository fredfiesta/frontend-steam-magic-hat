import { StrictMode } from 'react';
import Header from '../shared/header.jsx';
import ContentGrid from '../shared/content_grid.jsx';
import GamesContent from './games_content.jsx';

const GamesHomeContent = () => {
  return (
    <StrictMode>
      <ContentGrid>
        <Header />
        <GamesContent />
      </ContentGrid>
    </StrictMode>
  );
};

export default GamesHomeContent;