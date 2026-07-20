import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: 'https://via.placeholder.com/300x200?text=Course+Thumbnail',
    videoUrls: [{ title: '', url: '', duration: '' }],
    duration: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVideoChange = (index, field, value) => {
    const newVideoUrls = [...formData.videoUrls];
    newVideoUrls[index][field] = value;
    setFormData({
      ...formData,
      videoUrls: newVideoUrls
    });
  };

  const addVideoField = () => {
    setFormData({
      ...formData,
      videoUrls: [...formData.videoUrls, { title: '', url: '', duration: '' }]
    });
  };

  const removeVideoField = (index) => {
    if (formData.videoUrls.length > 1) {
      const newVideoUrls = formData.videoUrls.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        videoUrls: newVideoUrls
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, formData);
        setEditingCourse(null);
      } else {
        await api.post('/courses', formData);
      }
      
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        thumbnail: 'https://via.placeholder.com/300x200?text=Course+Thumbnail',
        videoUrls: [{ title: '', url: '', duration: '' }],
        duration: ''
      });
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      thumbnail: course.thumbnail,
      videoUrls: course.videoUrls.length > 0 ? course.videoUrls : [{ title: '', url: '', duration: '' }],
      duration: course.duration
    });
    setShowAddForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${courseId}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      thumbnail: 'https://via.placeholder.com/300x200?text=Course+Thumbnail',
      videoUrls: [{ title: '', url: '', duration: '' }],
      duration: ''
    });
  };

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-secondary-600">
              Manage courses and content for LearnHub
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            Add New Course
          </button>
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
                <div className="text-2xl font-bold text-secondary-900">{courses.length}</div>
                <div className="text-sm text-secondary-600">Total Courses</div>
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
                <div className="text-2xl font-bold text-secondary-900">
                  {courses.filter(c => c.isActive).length}
                </div>
                <div className="text-sm text-secondary-600">Active Courses</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">
                  {[...new Set(courses.map(c => c.category))].length}
                </div>
                <div className="text-sm text-secondary-600">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Course Form */}
        {showAddForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-field"
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., 2 hours"
                  />
                </div>
              </div>

              {/* Video URLs */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Course Videos
                </label>
                {formData.videoUrls.map((video, index) => (
                  <div key={index} className="grid md:grid-cols-4 gap-4 mb-4 p-4 border border-secondary-200 rounded-lg">
                    <div>
                      <label className="block text-xs text-secondary-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Video title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary-600 mb-1">URL</label>
                      <input
                        type="url"
                        value={video.url}
                        onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Video URL"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary-600 mb-1">Duration</label>
                      <input
                        type="text"
                        value={video.duration}
                        onChange={(e) => handleVideoChange(index, 'duration', e.target.value)}
                        className="input-field text-sm"
                        placeholder="e.g., 10:30"
                      />
                    </div>
                    <div className="flex items-end">
                      {formData.videoUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVideoField(index)}
                          className="btn-secondary text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideoField}
                  className="btn-secondary text-sm"
                >
                  Add Video
                </button>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Courses List */}
        <div>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Manage Courses
          </h2>
          
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                No courses yet
              </h3>
              <p className="text-secondary-600 mb-4">
                Start by creating your first course
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                Create Course
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="relative">
                  <CourseCard course={course} />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

