import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-700 transition-colors duration-500">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-60 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary-400 to-purple-400 dark:from-primary-600 dark:to-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-br from-pink-400 to-primary-400 dark:from-pink-600 dark:to-primary-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-accent-400 to-primary-400 dark:from-accent-600 dark:to-primary-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-2xl opacity-40 animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-6 px-6 py-3 bg-white/80 dark:bg-secondary-800/80 rounded-2xl shadow-xl glass-strong backdrop-blur-xl">
              <span className="text-sm font-bold text-gradient animate-pulse-soft">🎓 Welcome to LearnHub</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-900 dark:text-white mb-6 leading-tight animate-slide-up">
              Learn. Grow.{' '}
              <span className="text-gradient animate-gradient-x">
                Succeed.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Free short courses for everyone. Start your learning journey today with our comprehensive collection of educational content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <Link
                to="/courses"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl hover:from-primary-700 hover:via-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                style={{ backgroundSize: '200% 200%' }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Browse Courses</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>

              {!user && (
                <Link
                  to="/signup"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-secondary-900 dark:text-white bg-white/90 dark:bg-secondary-800/90 rounded-2xl hover:bg-white dark:hover:bg-secondary-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-white/20 dark:border-secondary-700/20 backdrop-blur-xl"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Get Started Free</span>
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Link>
              )}
            </div>

            {/* Enhanced Stats (center two items when present) */}
            <div className="mt-16 max-w-4xl mx-auto flex justify-center">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl place-items-center"
              >
                {[
                  { title: '7+', label: 'Courses', icon: '📚', color: 'from-primary-500 to-primary-700' },
                  { title: 'Free', label: 'Forever', icon: '🎉', color: 'from-pink-500 to-pink-700' }
                ].map((s, i) => (
                  <div
                    key={i}
                    className="group bg-white/80 dark:bg-secondary-800/80 rounded-2xl p-8 w-64 h-48 flex flex-col justify-center items-center shadow-xl glass-strong backdrop-blur-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {s.icon}
                    </div>
                    <div
                      className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}
                    >
                      {s.title}
                    </div>
                    <div className="text-base text-secondary-600 dark:text-secondary-400 font-semibold">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-secondary-50 to-white dark:from-secondary-700 dark:via-secondary-800 dark:to-secondary-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              Why Choose{' '}
              <span className="text-gradient animate-gradient-x">
                LearnHub?
              </span>
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto leading-relaxed">
              We provide high-quality educational content designed to help you succeed in your learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Enhanced Feature 1 */}
            <div className="group relative bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-secondary-700 dark:via-secondary-800 dark:to-secondary-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-3 group-hover:text-gradient transition-all duration-300">100% Free Courses</h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  Access all our premium courses completely free of charge. No hidden fees, ever.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get Certificates</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Earn completion certificates for your achievements and showcase your skills.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Learn at Your Pace</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Self-paced learning that fits your schedule. Study anytime, anywhere, at your own speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-2xl transform hover:scale-105"
            >
              Explore Courses
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white bg-opacity-20 backdrop-blur-lg rounded-xl hover:bg-opacity-30 transition-all duration-200 shadow-2xl transform hover:scale-105 border-2 border-white border-opacity-50"
              >
                Sign Up Free
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center">
        <p className="text-lg font-medium">&copy; {new Date().getFullYear()} LearnHub. All Rights Reserved.</p>
        {/* <p className="text-sm opacity-80 mt-2">
          Built with ❤️ using React & Tailwind CSS
        </p> */}
      </footer>
    </div>
  );
};

export default Home;

