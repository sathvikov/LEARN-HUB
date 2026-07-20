import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="card hover-lift group animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
        />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {course.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-secondary-900 dark:text-white line-clamp-2 group-hover:text-gradient transition-all duration-300">
          {course.title}
        </h3>
        
        <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-secondary-500 dark:text-secondary-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-secondary-500 dark:text-secondary-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{course.videoUrls?.length || 0} videos</span>
          </div>
        </div>
        
        <div className="pt-4">
          <Link to={`/courses/${course._id}`} className="w-full block group/btn">
            <button className="btn-primary w-full text-center group-hover/btn:scale-105 transition-transform duration-300">
              <span className="flex items-center justify-center space-x-2">
                <span>View Course</span>
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

