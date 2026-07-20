import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import api from '../../utils/api';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesResponse, profileResponse] = await Promise.all([
        api.get('/courses'),
        api.get('/auth/profile')
      ]);
      
      setAllCourses(coursesResponse.data.courses);
      setEnrolledCourses(profileResponse.data.user.enrolledCourses || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      // Call server to enroll
      await api.post('/auth/enroll', { courseId });

      // Refresh profile to get updated enrolled courses
      const profile = await api.get('/auth/profile');
      setEnrolledCourses(profile.data.user.enrolledCourses || []);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  // Normalize enrolled course ids to strings (handle populated courseId objects)
  const enrolledCourseIds = enrolledCourses.map(ec => {
    if (!ec) return null;
    // ec.courseId might be an object (populated) or an id string
    return (ec.courseId && ec.courseId._id) ? String(ec.courseId._id) : String(ec.courseId);
  }).filter(Boolean);

  const availableCourses = allCourses.filter(course => !enrolledCourseIds.includes(String(course._id)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-purple-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Student Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your learning journey and track your progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white">{enrolledCourses.length}</div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">Enrolled Courses</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {enrolledCourses.filter(ec => ec.completed).length}
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">Completed</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 4c-2.34 0-4.29 1.009-5.824 2.709" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {enrolledCourses.filter(ec => !ec.completed).length}
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('enrolled')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'enrolled'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                My Courses ({enrolledCourses.length})
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'available'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Available Courses ({availableCourses.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'enrolled' ? (
          <div>
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  No enrolled courses
                </h3>
                <p className="text-secondary-600 mb-4">
                  Start your learning journey by enrolling in courses
                </p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="btn-primary"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => {
                  // Resolve the actual course object. enrollment.courseId may be populated (object) or an id string.
                  let courseObj = null;

                  if (enrollment.courseId) {
                    if (typeof enrollment.courseId === 'object' && enrollment.courseId._id) {
                      courseObj = enrollment.courseId;
                    } else {
                      // Find matching course in allCourses by id
                      courseObj = allCourses.find(c => String(c._id) === String(enrollment.courseId)) || null;
                    }
                  }

                  // If we couldn't resolve a course, skip rendering this entry to avoid broken UI
                  if (!courseObj) return null;

                  return (
                    <div key={String(courseObj._id)} className="relative">
                      <CourseCard course={courseObj} />
                      {enrollment.completed && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Completed
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            {availableCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 4c-2.34 0-4.29 1.009-5.824 2.709" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  All courses enrolled
                </h3>
                <p className="text-secondary-600">
                  You're enrolled in all available courses!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course) => (
                  <div key={course._id} className="relative">
                    <CourseCard course={course} />
                    <div className="absolute bottom-2 right-2">
                      <button
                        onClick={() => handleEnroll(course._id)}
                        className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full hover:bg-primary-700 transition-colors"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

