import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Video {
  id: number;
  title: string;
  url: string;
}

interface Module {
  id: number;
  title: string;
  Video: Video[]; // Supabase returns capital V
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  Module: Module[]; // Supabase returns capital M
}

const CourseModule = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!course) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-custom-gray-light min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-custom-blue-dark">{course.title}</h1>
      <p className="mb-6 text-lg text-custom-gray-text">Instructor: {course.instructor}</p>

      {course.Module?.map((mod) => (
        <div key={mod.id} className="mb-6 bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-2 text-custom-blue-dark">{mod.title}</h2>

          {mod.Video?.map(video => (
            <div key={video.id} className="mb-4">
              <p className="font-medium text-custom-gray-text mb-1">{video.title}</p>
              <iframe
                src={video.url.replace('watch?v=', 'embed/')}
                title={video.title}
                allowFullScreen
                className="w-full h-64 rounded-lg shadow"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CourseModule;
