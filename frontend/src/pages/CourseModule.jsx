import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, ChevronRight, ChevronDown, Users, Star } from 'lucide-react';
import gridLogo from '../assets/grid-logo.png'; // Make sure the image exists here

const CourseModule = () => {
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedModules, setExpandedModules] = useState(new Set([0]));

  const courseData = {
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Sarah Johnson",
    rating: 4.8,
    students: 45230,
    duration: "12 weeks",
    level: "Beginner to Advanced",
    description: "Master modern web development with hands-on projects, from HTML/CSS basics to full-stack applications with React, Node.js, and databases.",
    modules: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        duration: "2 weeks",
        videos: [
          { id: 1, title: "Introduction to HTML", duration: "15:30", description: "Learn the basics of HTML structure and semantic elements" },
          { id: 2, title: "CSS Styling Basics", duration: "22:45", description: "Understanding CSS selectors, properties, and the box model" },
        ],
      },
      {
        id: 2,
        title: "JavaScript Programming",
        duration: "3 weeks",
        videos: [
          { id: 3, title: "JavaScript Fundamentals", duration: "28:15", description: "Variables, functions, and control structures in JavaScript" },
          { id: 4, title: "DOM Manipulation", duration: "32:40", description: "Interacting with HTML elements using JavaScript" },
        ],
      },
    ],
  };

  const markAsWatched = (videoId) => {
    setWatchedVideos(prev => new Set([...prev, videoId]));
  };

  const playVideo = (video) => {
    setSelectedVideo(video);
    setTimeout(() => markAsWatched(video.id), 2000);
  };

  const getTotalVideos = () => courseData.modules.reduce((acc, mod) => acc + mod.videos.length, 0);
  const getCompletionPercentage = () => Math.round((watchedVideos.size / getTotalVideos()) * 100);
  const getModuleProgress = (videos) => Math.round((videos.filter(v => watchedVideos.has(v.id)).length / videos.length) * 100);

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      newSet.has(moduleIndex) ? newSet.delete(moduleIndex) : newSet.add(moduleIndex);
      return newSet;
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!selectedVideo && courseData.modules.length > 0) {
      setSelectedVideo(courseData.modules[0].videos[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-custom-gray-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img src={gridLogo} alt="GRiD Logo" className="h-10 w-10 rounded-md" />
            <div>
              <h1 className="text-xl font-bold text-custom-gray-text">{courseData.title}</h1>
              <p className="text-sm text-custom-gray-text">by {courseData.instructor}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-custom-gray-text">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{courseData.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{courseData.students.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-custom-orange">{getCompletionPercentage()}%</div>
              <div className="text-xs text-custom-gray-text">Complete</div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b">
            <span className="text-sm font-medium text-custom-gray-text">Progress</span>
            <div className="w-full h-2 bg-gray-200 rounded-full my-2">
              <div
                className="h-full bg-gradient-to-r from-custom-blue-light to-custom-blue-dark rounded-full"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
            <div className="text-xs text-custom-gray-text">
              {watchedVideos.size} of {getTotalVideos()} videos watched
            </div>
          </div>

          {courseData.modules.map((module, index) => (
            <div key={module.id} className="border-b">
              <div className="flex justify-between p-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleModule(index)}>
                <div className="flex space-x-2">
                  {expandedModules.has(index) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-custom-blue-dark">{module.title}</h3>
                    <p className="text-xs text-custom-gray-text">{module.videos.length} videos • {module.duration}</p>
                  </div>
                </div>
                <div className="text-xs font-medium text-custom-gray-text">{getModuleProgress(module.videos)}%</div>
              </div>

              {expandedModules.has(index) && (
                <div className="bg-custom-gray-light">
                  {module.videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => playVideo(video)}
                      className={`px-6 py-3 border-l-4 cursor-pointer ${
                        selectedVideo?.id === video.id
                          ? 'bg-custom-blue-light border-custom-blue-dark'
                          : 'border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {watchedVideos.has(video.id) ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center">
                            <Play className="w-2 h-2 text-gray-400" />
                          </div>
                        )}
                        <div className="text-sm text-custom-gray-text">{video.title}</div>
                        <span className="text-xs text-custom-gray-text ml-auto">{video.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Video Area */}
        <main className="flex-1 flex flex-col bg-white overflow-y-auto">
          <div className="flex-1 flex items-center justify-center bg-black text-white">
            {selectedVideo ? (
              <div className="text-center p-8">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                <p className="text-sm text-gray-300">{selectedVideo.duration}</p>
              </div>
            ) : (
              <p>Select a video</p>
            )}
          </div>

          {/* Info Section */}
          {selectedVideo && (
            <div className="p-6 border-t">
              <h3 className="text-xl font-bold text-custom-blue-dark mb-2">{selectedVideo.title}</h3>
              <p className="text-custom-gray-text">{selectedVideo.description}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseModule;
