import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, ChevronRight } from 'lucide-react';

type Video = {
  id: number;
  title: string;
  url: string;
};

type Module = {
  id: number;
  title: string;
  videos: Video[];
};

type Course = {
  id: number;
  title: string;
  modules: Module[];
};

const CourseModule: React.FC = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${id}`)
      .then(res => {
        setCourseData(res.data);
        setSelectedVideo(res.data.modules?.[0]?.videos?.[0] || null);
        const expanded = new Set<number>(res.data.modules.map((m: Module) => m.id));

        setExpandedModules(expanded);
      })
      .catch(err => console.error(err));
  }, [id]);

  const toggleModule = (moduleId: number) => {
    const updated = new Set(expandedModules);
    updated.has(moduleId) ? updated.delete(moduleId) : updated.add(moduleId);
    setExpandedModules(updated);
  };

  if (!courseData) return <div className="p-8">Loading course...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 bg-custom-gray-light min-h-screen">
      {/* Left Sidebar */}
      <div className="col-span-1 bg-white shadow rounded-lg p-4 h-fit sticky top-4">
        <h2 className="text-xl font-bold mb-4 text-custom-blue-dark">{courseData.title}</h2>

        {courseData.modules.map((module) => (
          <div key={module.id} className="mb-4">
            <button
              onClick={() => toggleModule(module.id)}
              className="flex justify-between items-center w-full text-left font-semibold text-custom-gray-text mb-2"
            >
              {module.title}
              {expandedModules.has(module.id) ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
            {expandedModules.has(module.id) && (
              <ul className="pl-4 space-y-2">
                {module.videos.map((video) => (
                  <li key={video.id}>
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className={`text-left text-sm w-full ${
                        selectedVideo?.id === video.id ? 'text-custom-orange font-bold' : 'text-custom-gray-text'
                      } hover:underline`}
                    >
                      🎬 {video.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Right Video Panel */}
      <div className="col-span-1 lg:col-span-3 bg-white shadow rounded-lg p-6">
        {selectedVideo ? (
          <>
            <h3 className="text-xl font-semibold mb-4 text-custom-blue-dark">{selectedVideo.title}</h3>
            <div className="aspect-video mb-6">
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </>
        ) : (
          <p>Select a video to start learning.</p>
        )}
      </div>
    </div>
  );
};

export default CourseModule;
