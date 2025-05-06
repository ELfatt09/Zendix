import { useEffect, useState } from 'react';
import { useAuth } from '../../authContext';
import axios from 'axios';

function Edit() {
  const { user, edit, changePassword, error, message } = useAuth();
  const [userPfpPath, setUserPfpPath] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJobsId, setSelectedJobsId] = useState(0);
  const [selectedJobsName, setSelectedJobsName] = useState('');
  const [notification, setNotification] = useState([]);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEdit = (e) => {
    e.preventDefault();
    edit(username, bio, user.pfpPath, selectedJobsId);
  };
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setNotification(changePassword(oldPassword, newPassword, confirmPassword));
  };
  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get('http://localhost:8080/jobs/');
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
    setSelectedJobsName(user?.job?.Name ?? '');
    setSelectedJobsId(user?.jobId);
    setUsername(user?.username ?? '');
    setBio(user?.bio ?? '');
    setUserPfpPath(user?.pfpPath ?? '');
  }, [user]);


  return (
    <section className="bg-white">
      <div className='flex flex-col lg:flex-row gap-2  py-5 px-5'>
      <div className="flex flex-col w-full lg:w-2/3 px-4 py-8 mx-auto lg:py-16 rounded-lg border-2">
        <h2 className="mb-4 text-xl font-bold text-slate-950">
          Personal info
        </h2>
        <form onSubmit={handleEdit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className='sm:col-span-2 rounded-lg border p-3 flex flex-row'>
              <img className='w-20 h-20 rounded-full' src={userPfpPath} alt="" />
                <label htmlFor='file-input' onChange={(e) => setUserPfpPath(URL.createObjectURL(e.target.files[0]))}>
                  <span className='flex flex-row items-center justify-center gap-2 bg-violet-600 text-white rounded-lg p-2 hover:bg-violet-700'>Change photo</span>
                  <input type='file' id='file-input' className='hidden' />
                </label>
              </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-slate-950"
              >
                Username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-slate-950 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 "
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Bio
              </label>
              <textarea
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Enter your bio..."
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="jobs"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Job
              </label>
              <select
                id="jobs"
                name="jobs"
                className="w-1/2 text-sm py-3 px-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 "
                value={selectedJobsId}
                onChange={(e) => {
                  setSelectedJobsId(parseInt(e.target.value)) 
                  setSelectedJobsName(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option value={selectedJobsId}>{selectedJobsName}</option>
                {jobs.map((job) => (
                  <option key={job.ID} value={job.ID}>
                    {job.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-10">
            <button
              type="submit"
              className="text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Info
            </button>
          </div>
        </form>
        </div>
        <div className='flex flex-col w-full lg:w-1/3 px-4 py-8 mx-auto lg:py-16 lg:px-12 rounded-lg border-2'>
        <h2 className="mb-4 text-xl font-bold text-slate-950 ">
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter old password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm new password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4 ">
            <button
              type="submit"
              className="text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Change Password
            </button>
            </div>
            <p className='text-red-600'>{error}</p>
            <p className='text-green-600'>{message}</p>
        </form>
        </div>
      </div>
    </section>
  );
}

export default Edit;

