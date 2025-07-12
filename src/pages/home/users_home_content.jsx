import { StrictMode } from 'react';
import Header from '../shared/header.jsx';
import UsersContent from './users_content.jsx';
import ContentGrid from '../shared/content_grid.jsx';

const UsersHomeContent = () => {
  return (
    <StrictMode>
      <ContentGrid>
        <Header />
        <UsersContent />
      </ContentGrid>
    </StrictMode>
  );
};

export default UsersHomeContent;