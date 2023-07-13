import { Outlet } from 'react-router-dom';

import BlogActions from '../Components/BlogActions';

function BlogLayout() {
  return (
    <>
      <BlogActions />
      <Outlet />
    </>
  );
}

export default BlogLayout;
