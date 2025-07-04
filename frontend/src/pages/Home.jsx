import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Users, Play, Code, Palette, TrendingUp, Brain, Camera, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: Code, color: 'bg-custom-blue-dark' },
    { name: 'Programming', icon: Code, color: 'bg-custom-orange' },
    { name: 'Design', icon: Palette, color: 'bg-custom-orange' },
    { name: 'Business', icon: TrendingUp, color: 'bg-custom-orange' },
    { name: 'AI & ML', icon: Brain, color: 'bg-custom-orange' },
    { name: 'Photography', icon: Camera, color: 'bg-custom-orange' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      rating: 4.8,
      students: 15420,
      duration: '52 hours',
      category: 'Programming',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      level: 'Beginner',
      description: 'Learn HTML, CSS, JavaScript, Node.js, React, and more in this comprehensive bootcamp.',
      bestseller: true
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 8930,
      duration: '38 hours',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      level: 'Intermediate',
      description: 'Master the principles of user interface and user experience design.',
      bestseller: false
    },
    {
      id: 3,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Gary Vaynerchuk',
      rating: 4.7,
      students: 12450,
      duration: '28 hours',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      level: 'Beginner',
      description: 'Learn SEO, social media marketing, and content strategy from industry experts.',
      bestseller: true
    },
    {
      id: 4,
      title: 'Machine Learning A-Z',
      instructor: 'Andrew Ng',
      rating: 4.9,
      students: 21500,
      duration: '44 hours',
      category: 'AI & ML',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop',
      level: 'Advanced',
      description: 'Hands-on Python and R for data science and machine learning algorithms.',
      bestseller: true
    },
    {
      id: 5,
      title: 'Portrait Photography Pro',
      instructor: 'Annie Leibovitz',
      rating: 4.6,
      students: 6800,
      duration: '32 hours',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=400&h=250&fit=crop',
      level: 'Intermediate',
      description: 'Master lighting, composition, and editing for professional portraits.',
      bestseller: false
    },
    {
      id: 6,
      title: 'Advanced JavaScript Patterns',
      instructor: 'Kyle Simpson',
      rating: 4.8,
      students: 9500,
      duration: '18 hours',
      category: 'Programming',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop',
      level: 'Advanced',
      description: 'Deep dive into closures, prototypes, and functional programming concepts.',
      bestseller: true
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
        </div>
        {course.bestseller && (
          <div className="absolute top-3 left-3 bg-custom-orange text-white px-2 py-1 rounded-full text-xs font-bold">
            Bestseller
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold">
          {course.level}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 text-custom-gray-text line-clamp-2">{course.title}</h3>
        <p className="text-custom-gray-text text-sm mb-3 line-clamp-2">{course.description}</p>
        <p className="text-custom-gray-text text-sm mb-3">by {course.instructor}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-custom-gray-text">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500 fill-current" size={16} />
            <span className="font-semibold">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
        </div>

        <Link to={`/course/${course.id}`}>
          <button className="bg-custom-blue-dark hover:bg-custom-orange text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 w-full">
            Enroll Now
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-custom-gray-light flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Grid Logo" className="h-12 w-auto mr-3" />
              
            </div>
            <div className="flex items-center space-x-6">
              <img src="/logo2.png" alt="Second Logo" className="h-12 w-auto" />
              <img src="/logo3.png" alt="Third Logo" className="h-12 w-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Mission Statement */}
      <section className="bg-white py-12 text-center border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-custom-blue-dark mb-6">GROW RISE DOMINATE</h2>
          <p className="text-xl text-custom-gray-text max-w-3xl mx-auto">
            Transform your future with our premium courses taught by industry leaders. 
            Whether you're starting out or leveling up, we have the perfect learning path for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Filter and Course Grid */}
        <section className="max-w-7xl mx-auto py-12 px-4">
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for courses..."
                className="w-full pl-12 pr-4 py-4 border rounded-xl text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category.name
                        ? `${category.color} text-white shadow-lg transform scale-105`
                        : 'bg-white text-custom-gray-text hover:bg-gray-100 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <Icon size={18} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-custom-blue-dark text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">GRiD Academy</h3>
              <p className="mb-4">Empowering learners worldwide with premium education since 2023.</p>
              <div className="flex space-x-4">
                <a href="#"><Facebook className="hover:text-custom-orange" /></a>
                <a href="#"><Twitter className="hover:text-custom-orange" /></a>
                <a href="#"><Instagram className="hover:text-custom-orange" /></a>
                <a href="#"><Linkedin className="hover:text-custom-orange" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/courses" className="hover:text-custom-orange">All Courses</Link></li>
                <li><Link to="/about" className="hover:text-custom-orange">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-custom-orange">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-custom-orange">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>contact@gridacademy.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>123 Education St, Silicon Valley, CA 94000</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="mb-3">Subscribe for course updates and offers</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-custom-orange hover:bg-orange-600 px-4 py-2 rounded-r-lg font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            <p>© 2023 GRiD Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;