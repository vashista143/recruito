import React from 'react'
import NavBar from '../components/NavBar'
import ProfileCompletionCard from '../components/SideDiv'
import UserMainContent from '../components/UserMainContent'
const UserHomePage = ({appliedjobs ,jobs, userauthuser }) => {
   return (
    <div className="w-full ">
      <NavBar />

      <div className="
  mt-5 
  grid 
  grid-cols-1    
  md:grid-cols-[25%_75%] 

">
        
        <div className="w-fit h-fit  md:mx-5">
          <ProfileCompletionCard userauthuser={userauthuser}/>
        </div>

        <div>
          <UserMainContent  appliedjobs={appliedjobs} jobs={jobs} userauthuser={userauthuser}/>
        </div>

        <div>
    
          

        </div>
        {/* show message only if resume not uploaded */}
          {!userauthuser.resumePdfUrl && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded">
              Please upload your resume before applying
            </div>
          )}
      </div>
    </div>
  )
}

export default UserHomePage
