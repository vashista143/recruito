import React, { useRef, useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getTimeAgo = (dateString) => {
  if (!dateString) return 'Recently';
  const posted = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
};

// Job Card
const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const companyInitial = job.companyName?.charAt(0).toUpperCase() || '?';
  const timeAgo = getTimeAgo(job.postedAt);

  const truncatedTitle =
    job.title?.length > 25 ? job.title.slice(0, 25) + '...' : job.title;

  return (
    <div
      onClick={() => navigate(`/user/showjob/${job._id}`, { state: { job } })}
      className="flex-shrink-0 w-[35vh] sm:w-[38vh] p-4 bg-white border border-gray-200 rounded-xl 
                 shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs text-gray-500">{timeAgo}</span>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-red-700"
          style={{
            background: 'linear-gradient(to right, #ffe5e5, #ffffff)',
            border: '1px solid #f5c2c2',
          }}
        >
          {companyInitial}
        </div>
      </div>

      <p className="text-sm font-semibold text-gray-800 min-h-[40px]">
        {truncatedTitle}
      </p>

      <p className="text-xs text-gray-500 truncate mt-1 mb-2">{job.companyName}</p>

      <div className="flex items-center justify-between text-xs mt-1">
        <div className="flex items-center text-gray-700">
          <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-medium">{job.rating || '4.5'}</span>
          <span className="text-gray-500 ml-1">| {job.reviews || '100+'}</span>
        </div>
        <span className="text-gray-500 truncate max-w-[50%]">{job.location}</span>
      </div>
    </div>
  );
};

// Carousel
const RecommendedJobsCarousel = ({ loading, jobs = [] }) => {
  const scrollRef = useRef(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft >= maxScroll - 5);
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener('scroll', checkScroll);

    return () => el.removeEventListener('scroll', checkScroll);
  }, [jobs]);

  const hasJobs = jobs.length > 0;

  return (
    <div className="pt-5 mb-6 relative">

      {/* LEFT BUTTON — hidden on mobile (md:hidden) */}
      {!atStart && hasJobs && (
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-0 top-[40%] z-10 
                     w-10 h-10 bg-white border border-gray-300 rounded-full 
                     shadow items-center justify-center text-gray-600 
                     hover:text-blue-600"
        >
          &lt;
        </button>
      )}

      {hasJobs ? (
        <>
          <div
            ref={scrollRef}
            className="flex space-x-4 pb-4 overflow-x-scroll scrollbar-hide
                       snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {jobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>

          {/* RIGHT BUTTON — hidden on mobile */}
          {!atEnd && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-2 top-[40%] 
                         w-10 h-10 bg-white border border-gray-300 rounded-full 
                         shadow items-center justify-center text-gray-600 
                         hover:text-blue-600"
            >
              &gt;
            </button>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 font-medium py-10 text-lg">
          No jobs to show
        </div>
      )}
    </div>
  );
};

export default RecommendedJobsCarousel;
