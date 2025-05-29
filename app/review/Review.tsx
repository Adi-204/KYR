"use client"

import { useState, useCallback, useEffect } from "react";
import { Upload, FileText, Sparkles, Trophy, Clock, BarChart2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReviewResults from "./ReviewResults";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDropzone } from "react-dropzone";
import ReviewLoader from "@/components/ReviewLoader";

export default function Review() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [resumeURL, setResumeURL] = useState("");
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type === "application/pdf") {
        if (file.size <= 8 * 1024 * 1024) {
          setResumeFile(file);
          setIsLoading(true);
          let progress = 0;
          const progressInterval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 90) clearInterval(progressInterval);
          }, 100);

          try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/resume/upload", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            setResumeURL(data.resumeUrl);
            setUploadProgress(100);
            setIsUploaded(true);
          } catch (error) {
            setUploadError("Failed to upload resume");
          } finally {
            setIsLoading(false);
            clearInterval(progressInterval);
          }
        } else {
          setUploadError("File size must be less than 8MB");
        }
      } else {
        setUploadError("Only PDF files are allowed");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 8 * 1024 * 1024,
  });

  const fetchGeminiData = async () => {
    if (!resumeURL) return;
    setLoadingReview(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cloudinaryPdfUrl: resumeURL,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch review from API");
      }
      const data = await res.json();
      setReview(data.resumeReview);
      console.log(data.resumeReview);
    } catch (err: any) {
      setUploadError("Failed to analyze resume");
    } finally {
      setLoadingReview(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeURL) {
      await fetchGeminiData();
    }
  };

  if (Object.keys(review).length > 0) {
    return <ReviewResults review={review} />;
  }
  
  if(loadingReview){
    return <ReviewLoader />
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Resume Review Pro</h1>
        <p className="text-muted-foreground">
          Get expert-level feedback on your resume in seconds
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI-Powered</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30+</div>
            <p className="text-xs text-muted-foreground">
              Points analyzed in your resume
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fast Results</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Instant</div>
            <p className="text-xs text-muted-foreground">
              Feedback in seconds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Of users improve their resumes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Your Resume
          </CardTitle>
          <CardDescription>
            Get personalized feedback to help you land more interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary"
                }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-3">
                {isUploaded ? (
                  <CheckCircle className="h-10 w-10 text-green-500" />
                ) : (
                  <Upload className="h-10 w-10 text-muted-foreground" />
                )}
                {isDragActive ? (
                  <p className="font-medium">Drop your resume here</p>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {resumeFile
                          ? isUploaded
                            ? "Resume uploaded successfully!"
                            : resumeFile.name
                          : "Drag & drop your resume here"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF format, max 8MB
                      </p>
                    </div>
                    {!isUploaded && (
                      <Button variant="outline" type="button">
                        Select File
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {resumeFile && !isUploaded && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading {resumeFile.name}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadError && (
              <p className="text-sm text-red-500 flex items-center gap-2">
                <span>⚠️</span> {uploadError}
              </p>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={!isUploaded || isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <BarChart2 className="h-4 w-4 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get Expert Review
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg">What You'll Get:</h3>
        <ul className="space-y-3 list-disc pl-5">
          <li>ATS compatibility score</li>
          <li>Keyword optimization suggestions</li>
          <li>Formatting and structure analysis</li>
          <li>Impact measurement of your bullet points</li>
          <li>Personalized improvement recommendations</li>
        </ul>
      </div>
    </div>
  );
}
