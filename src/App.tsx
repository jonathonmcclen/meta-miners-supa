import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './Components/RootLayout';
import BlogLayout from './pages/BlogLayout';
import BlogPostsPage from './pages/BlogPosts';
import NewPostPage from './pages/NewPost';
import PostDetailPage from './pages/PostDetail';
import WelcomePage from './pages/WelcomePage';
import './App.css';
import { CustomProvider } from 'rsuite';
import Login from './pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './hooks/Auth';
import Signup from './pages/SignUp';
import Profile from './Views/Profile';
import Inventory from './Views/Inventory';
import Simulator from './Views/Simulator';
import Challenges from './Views/Challenges';
import ConfirmEmail from './Views/ConfirmEmail';

function App() {
  return (
    <CustomProvider theme="dark">
      <BrowserRouter>
        <AuthProvider>
          <RootLayout>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <WelcomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
              <Route path="/simulator" element={<ProtectedRoute><Simulator /></ProtectedRoute>} />
              <Route path="/challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
              <Route path="/confirm-email" element={<ConfirmEmail />} />

              <Route
                path="blog"
                element={
                  <ProtectedRoute>
                    <BlogLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<BlogPostsPage />} />
                <Route path=":id" element={<PostDetailPage />} />
              </Route>
              <Route path="/blog/new" element={<NewPostPage />} />
            </Routes>
          </RootLayout>
        </AuthProvider>
      </BrowserRouter>
    </CustomProvider>
  );
}

export default App;
