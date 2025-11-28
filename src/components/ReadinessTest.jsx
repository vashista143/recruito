import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'; // Added CheckCircle icon

// --- Mock Data for Roles ---
const rolesData = [
  {
    id: 'rn-dev',
    title: 'React Native Developer',
    avgSalary: '5.5L',
    demand: '20%',
    image: 'https://images.unsplash.com/photo-1670057037226-b3d65909424f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3QlMjBuYXRpdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',  // coding on laptop
    skills: [
      { name: 'Aptitude', type: 'basic' },
      { name: 'Verbal ability', type: 'basic' },
      { name: 'Mobile Dev', score: '+7', type: 'dynamic' },
    ],
    checkReadinessLink: 'https://welovedevs.com/app/tests/react-native-2023',
    knowMoreLink: '#',
  },
  {
    id: 'django-dev',
    title: 'Django Backend Developer',
    avgSalary: '6.0L',
    demand: '22%',
    image: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGphbmdvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',  // server racks / backend
    skills: [
      { name: 'Aptitude', type: 'basic' },
      { name: 'Verbal ability', type: 'basic' },
      { name: 'Backend Logic', score: '+9', type: 'dynamic' },
    ],
    checkReadinessLink: 'https://welovedevs.com/app/tests/django',
    knowMoreLink: '#',
  },
  {
    id: 'java-dev',
    title: 'Java Backend Developer',
    avgSalary: '6.5L',
    demand: '18%',
    image: 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF2YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',  // coffee + code / backend dev
    skills: [
      { name: 'Aptitude', type: 'basic' },
      { name: 'Verbal ability', type: 'basic' },
      { name: 'Java OOP', score: '+8', type: 'dynamic' },
    ],
    checkReadinessLink: 'https://welovedevs.com/app/tests/java-and-craftsmanship',
    knowMoreLink: '#',
  },
  {
    id: 'ts-frontend',
    title: 'TypeScript Frontend Developer',
    avgSalary: '5.8L',
    demand: '25%',
    image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJvbnRlbmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',  // frontend dev setup
    skills: [
      { name: 'Aptitude', type: 'basic' },
      { name: 'Verbal ability', type: 'basic' },
      { name: 'Frontend Eng', score: '+10', type: 'dynamic' },
    ],
    checkReadinessLink: 'https://welovedevs.com/app/tests/typescript-overvie',
    knowMoreLink: '#',
  },
  {
    id: 'ml-engineer',
    title: 'Python Machine Learning Engineer',
    avgSalary: '7.0L',
    demand: '30%',
    image: 'https://media.istockphoto.com/id/2149059417/photo/llm-ai-large-language-model-concept-businessman-working-on-laptop-with-llm-icons-on-virtual.webp?a=1&b=1&s=612x612&w=0&k=20&c=N4C1DfXBfMNSkQE9R_meQAx7THI-GqwBTTjvFoZ_5QY=',  // AI / ML abstract image
    skills: [
      { name: 'Aptitude', type: 'basic' },
      { name: 'Verbal ability', type: 'basic' },
      { name: 'Data Science', score: '+12', type: 'dynamic' },
    ],
    checkReadinessLink: 'https://welovedevs.com/app/tests/python-scikit-learn',
    knowMoreLink: '#',
  },
];


// --- Sub-component for a single role card ---
const RoleCard = ({ role }) => (
  <div className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    {/* Image */}
    <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
      <img src={role.image} alt={role.title} className="w-full h-full object-cover" />
    </div>

    <div className="p-4">
      {/* Title */}
      <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">{role.title}</h3>

      {/* Salary & Demand */}
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <span className="font-medium">Avg. salary {role.avgSalary}</span>
        {role.demand && (
          <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center">
            <CheckCircle size={12} className="mr-1" /> {role.demand} demand since last year
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {role.skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 text-xs rounded-full 
              ${skill.type === 'basic' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'}`}
          >
            {skill.name} {skill.score && <span className="font-semibold">{skill.score}</span>}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex space-x-3">
        <a 
          href={role.checkReadinessLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Check readiness
        </a>
        <a 
          href={role.knowMoreLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Know more
        </a>
      </div>
    </div>
  </div>
);

// --- Main Pathfinder Section Component ---
const PathfinderSection = () => {
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Software Product company'); // State for active tab

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust as needed
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">pathfinder</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Discover the career path that's right for you!
        Explore roles, check your readiness, and succeed with a personalised learning plan.
      </p>

      {/* Roles in IT Industry Label */}
      <p className="text-sm font-semibold text-gray-700 mb-3">Roles in IT Industry</p>

      {/* Category Tabs */}
      <div
  className="
    flex space-x-4 mb-6 overflow-x-auto whitespace-nowrap
    scrollbar-none scroll-smooth
  "
>
  {[
    'Software Product company',
    'Startup company',
    'IT services and consulting company',
    'GCC',
    'Others',
  ].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`
        px-4 py-2 text-sm rounded-full border 
        ${activeTab === tab
          ? 'bg-blue-50 text-blue-700 border-blue-500 font-medium'
          : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100'}
        transition-colors duration-200 flex-shrink-0
      `}
    >
      {tab}
    </button>
  ))}
</div>


      {/* Role Cards Carousel */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex space-x-4 pb-4 overflow-x-scroll scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for most browsers
        >
          {rolesData.map(role => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300 w-9 h-9 cursor-pointer hover:bg-gray-50 z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300 w-9 h-9 cursor-pointer hover:bg-gray-50 z-10"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default PathfinderSection;
