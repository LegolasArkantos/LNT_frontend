import React,{useEffect} from 'react';


const TeacherSessionsPage = () => {

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Enable scrolling on unmount (cleanup)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  return (
    <div className="flex h-screen">

      
        {/* Main Content */}
        {/* Main Content */}
        <div className="p-8 flex space-x-8 h-full">
          {/* Sessions Container */}
          <div className="rounded bg-white p-8 flex-1 h-screen-1/2 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Teacher Sessions</h2>

            {/* Session Cards (Dummy Data) */}
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Session {index + 1}</h3>
                <p>Subject: Math</p>
                <p>Price: $20</p>
                <p>No. of Students: 10</p>
              </div>
            ))}
          </div>

          {/* Assignments Container */}
          <div className="rounded bg-white p-8 flex-1 h-screen-1/2 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Assignments</h2>

            {/* Assignment Cards (Dummy Data) */}
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Assignment {index + 1}</h3>
                <p>Subject: Science</p>
                <p>Time: Due in 3 days</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    
  );
};

export default TeacherSessionsPage;
