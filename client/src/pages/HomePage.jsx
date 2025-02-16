import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Layout, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/v1/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts); // Accéder au tableau posts dans la réponse
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Layout className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Blog Posts</h1>
        </div>
        <Button>
          <Link to="/new">Nouveau</Link>
        </Button>
      </div>

      {loading && <p>Chargement des posts...</p>}
      {error && <p className="text-red-500">Erreur: {error}</p>}
      {!loading && !error && posts.length === 0 && <p>Pas de post</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(posts) &&
          posts.length > 0 &&
          posts.map((post) => (
            <Card key={post._id} className="overflow-hidden transition-all hover:shadow-lg">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" /> {post.author}
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4" /> {new Date(post.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Link to={`/details/${post._id}`}>Lire la suite</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default HomePage;