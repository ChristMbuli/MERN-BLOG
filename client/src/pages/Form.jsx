import React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, Loader2, X } from "lucide-react";

const Form = () => {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");
    const [imgPercentage, setImagePercentage] = useState("");

    useEffect(() => {
        imageUrl && uploadFile(image, "imageUrl")

    }, [image])
    const uploadFile = async (file, fieldName) => { }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview();
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("image", image);
      const response = await fetch("/api/v1/posts/new", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
                      <Input
                          id="title"
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter post title"
                          required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
                          id="content"
                          name="content"
                          onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="min-h-[150px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
                      <Input
                          id="author"
                          
                          name="author"
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="Enter author name"
                          required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
                <Input
                  id="image"
                                  type="file"
                                  name="image"
                        onChange={(e) => setImage((prev) => e.target.files[0])}

                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>

              {preview && (
                <div className="relative w-full max-w-[300px]">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="rounded-lg object-cover w-full h-[200px]"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Post...
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
