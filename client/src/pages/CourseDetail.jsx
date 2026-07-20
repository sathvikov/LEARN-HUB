import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from '../components/VideoPlayer';
import api from '../utils/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isStudent } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedEmbedUrl, setSelectedEmbedUrl] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data.course);

      const firstRaw = response.data.course?.videoUrls?.[0]?.url;
      if (firstRaw) setSelectedEmbedUrl(normalizeToEmbed(firstRaw));

      try {
        const profileRes = await api.get('/auth/profile');
        const enroll = (profileRes.data.user.enrolledCourses || []).find(ec => {
          const cid = ec.courseId && ec.courseId._id ? String(ec.courseId._id) : String(ec.courseId);
          return cid === String(id);
        });
        if (enroll) setIsCompleted(Boolean(enroll.completed));
      } catch {
        // ignore if not logged in
      }
    } catch (error) {
      setError('Failed to fetch course details');
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoChange = (index) => {
    setCurrentVideoIndex(index);
    const raw = course?.videoUrls?.[index]?.url;
    if (raw) {
      const embed = normalizeToEmbed(raw);
      setSelectedEmbedUrl(embed);
    }
  };

  // Normalize YouTube & embed URLs
  const normalizeToEmbed = (url) => {
    if (!url) return '';
    try {
      let candidate = url;
      if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
      const u = new URL(candidate);
      const host = u.hostname.replace('www.', '');
      if (host.includes('youtube.com')) {
        const v = u.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}`;
        if (u.pathname.includes('/embed/')) return candidate;
      }
      if (host === 'youtu.be') {
        const id = u.pathname.slice(1);
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      const m = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
      if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
      return candidate;
    } catch {
      const m = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
      if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
      return url;
    }
  };

  const handleMarkComplete = async () => {
    if (!user || !isStudent()) {
      navigate('/login');
      return;
    }
    try {
      const res = await api.post('/auth/complete', { courseId: course._id });
      const enrolledCourses = res.data.enrolledCourses || [];
      const enroll = enrolledCourses.find(ec => {
        const cid = ec.courseId && ec.courseId._id ? String(ec.courseId._id) : String(ec.courseId);
        return cid === String(course._id);
      });
      if (enroll && enroll.completed) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error marking course complete:', error);
    }
  };

  const generateCertificate = async () => {
    try {
      const response = await api.post('/certificates/generate', {
        courseId: course._id
      });
      const certificate = response.data.certificate || null;
      const { jsPDF } = await import('jspdf');
      if (!user || !isStudent()) {
        navigate('/login');
        return;
      }
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 18;

      doc.setLineWidth(1.8);
      doc.setDrawColor(180, 130, 0);
      doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

      doc.setFont('times', 'bold');
      doc.setFontSize(26);
      doc.text('Certificate of Completion', pageWidth / 2, 45, { align: 'center' });

      doc.setFont('times', 'italic');
      doc.setFontSize(14);
      doc.text('This is to certify that', pageWidth / 2, 60, { align: 'center' });

      const studentName = (certificate && certificate.studentName)
        ? certificate.studentName
        : (user && user.name)
          ? user.name
          : 'Recipient Name';
      doc.setFont('times', 'bold');
      doc.setFontSize(30);
      doc.setTextColor(25, 90, 160);
      doc.text(studentName, pageWidth / 2, 80, { align: 'center' });

      doc.setFont('times', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('has successfully completed the course', pageWidth / 2, 95, { align: 'center' });

      doc.setFont('times', 'bolditalic');
      doc.setFontSize(22);
      doc.setTextColor(25, 90, 160);
      doc.text(course.title || 'Course Title', pageWidth / 2, 108, { align: 'center' });

      doc.setDrawColor(180, 130, 0);
      doc.setLineWidth(0.8);
      doc.line(pageWidth / 2 - 30, 118, pageWidth / 2 + 30, 118);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 90);
      doc.text('LearnHub – Learn. Grow. Succeed.', pageWidth / 2, 130, { align: 'center' });

      const date = new Date().toLocaleDateString();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      doc.text(`Date: ${date}`, margin + 5, pageHeight - margin - 10);
      doc.text(`Certificate ID: ${certificate._id || 'N/A'}`, margin + 5, pageHeight - margin - 4);

      const stampCenterX = pageWidth - margin - 30;
      const stampCenterY = pageHeight - margin - 34;

      doc.setLineWidth(1.4);
      doc.setDrawColor(212, 175, 55);
      doc.circle(stampCenterX, stampCenterY, 20, 'S');
      doc.setFillColor(220, 50, 50);
      doc.circle(stampCenterX, stampCenterY, 16, 'F');
      doc.setFillColor(255, 255, 255);
      doc.circle(stampCenterX, stampCenterY, 9, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(220, 50, 50);
      doc.text('LearnHub', stampCenterX, stampCenterY + 1.5, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const rx = stampCenterX + Math.cos(angle) * 14;
        const ry = stampCenterY + Math.sin(angle) * 14;
        doc.text('*', rx, ry, { align: 'center' });
      }

      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      doc.text('OFFICIAL SEAL', stampCenterX, pageHeight - margin - 8, { align: 'center' });

      const safeTitle = (course.title || 'certificate')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '');
      doc.save(`LearnHub-Certificate-${safeTitle}.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Course not found'}</p>
          <button onClick={() => navigate('/courses')} className="btn-primary">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-purple-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-700 py-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Video + Description */}
          <div className="lg:col-span-2">
            <div className="card">
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                {course.title}
              </h1>

              <div className="mb-6">
                <VideoPlayer
                  videoUrl={selectedEmbedUrl || course.videoUrls[currentVideoIndex]?.url}
                  title={course.videoUrls[currentVideoIndex]?.title}
                />
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                  Course Description
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {isStudent() && (
                <div className="flex items-center gap-4">
                  {!isCompleted ? (
                    <button onClick={handleMarkComplete} className="btn-primary">
                      Mark as Complete
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <button onClick={generateCertificate} className="btn-primary">
                        Generate Certificate
                      </button>
                      <div className="inline-flex items-center bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Completed
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Course Info + Video List */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Course Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">Category:</span>
                  <span className="ml-2 text-secondary-900 dark:text-white">{course.category}</span>
                </div>
                <div>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">Duration:</span>
                  <span className="ml-2 text-secondary-900 dark:text-white">{course.duration}</span>
                </div>
                <div>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">Videos:</span>
                  <span className="ml-2 text-secondary-900 dark:text-white">{course.videoUrls?.length || 0}</span>
                </div>
                <div>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">Created by:</span>
                  <span className="ml-2 text-secondary-900 dark:text-white">{course.createdBy?.name}</span>
                </div>
              </div>
            </div>

            {course.videoUrls && course.videoUrls.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Course Videos
                </h3>
                <div className="space-y-2">
                  {course.videoUrls.map((video, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleVideoChange(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentVideoIndex === index
                          ? 'bg-primary-100 text-primary-700 border border-primary-200'
                          : 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{video.title}</div>
                          {video.duration && (
                            <div className="text-sm text-secondary-500">{video.duration}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-sm text-secondary-600 dark:text-secondary-400">
                  Now playing: {currentVideoIndex + 1} / {course.videoUrls?.length || 0}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
