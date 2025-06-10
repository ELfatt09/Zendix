import { useEffect, useState } from 'react';
import { useAuth } from '../../authContext';
import axios from 'axios';

function Edit() {
  const { user, edit, changePassword, error, message } = useAuth();
  const [userPfpPath, setUserPfpPath] = useState('');
  const [fullname, setFullname] = useState('');
  const [description, setDescription] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJobsId, setSelectedJobsId] = useState(0);
  const [selectedJobsName, setSelectedJobsName] = useState('');
  const [notification, setNotification] = useState([]);

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEdit = (e) => {
    e.preventDefault();
    edit(fullname, description, user.PersonalInfo.pfpPath, selectedJobsId, address, phone, gender);
  };
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setNotification(changePassword(oldPassword, newPassword, confirmPassword));
  };

  const handelPfpChange = (e) => {
    e.preventDefault();
    setUserPfpPath(URL.createObjectURL(e.target.files[0]))
    const imageData = new FormData();   
    imageData.append('PfpImage', e.target.files[0]);
    axios.put(
      'http://localhost:8080/profile/edit/pfp',
      imageData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then((res) => {
        console.log('pfp response', res.data);
      })
      .catch(err => { console.error(err) });

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
    setSelectedJobsName(user?.PersonalInfo.job?.Name ?? '');
    setSelectedJobsId(user?.JobId);
    setFullname(user?.PersonalInfo.Fullname ?? '');
    setDescription(user?.PersonalInfo.Description ?? '');
    setUserPfpPath("http://localhost:8080" +user?.PersonalInfo.PfpPath ?? '');
    setAddress(user?.PersonalInfo.Address ?? '');
    setPhone(user?.PersonalInfo.Phone ?? '');
    setGender(user?.PersonalInfo.Gender ?? null);
  }, [user]);


  return (
    <section className="bg-text">
      <div className='flex flex-col lg:flex-row gap-2  py-5 px-5 '>
        <div className='flex flex-col gap-2 w-full lg:w-2/3'>
          <div className="bg-text flex flex-row w-full px-4 py-2 mx-auto rounded-lg border-2 items-center space-x-4">
              <img className='w-32 h-32 rounded-full' src={userPfpPath} alt="" />
                <label htmlFor='file-input' onChange={(e) => {
                  handelPfpChange(e);
            
                }}>
                  <span className='flex flex-row items-center justify-center gap-2 text-primary bg-text rounded-lg p-2 border border-primary hover:font-semibold hover:border-2 transition ease-in-out duration-300 cursor-pointer'>Change photo</span>
                  <input type='file' id='file-input' className='hidden' />
                </label>
              </div>
      <div className="bg-text flex flex-col w-full px-4 py-8 mx-auto lg:py-16 rounded-lg border-2">
        <h2 className="mb-4 text-xl font-bold text-slate-950">
          Personal info
        </h2>
        <form onSubmit={handleEdit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-slate-950"
              >
                Fullname
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-slate-950 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                value={fullname}
                placeholder="Enter your fullname"
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Enter your description..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <textarea
                id="address"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Enter your address..."
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></textarea>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-1/2 text-sm py-3 px-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 "
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option >Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option >Dont want to say</option>
              </select>
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
              className="text-text bg-primary hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Info
            </button>
          </div>
        </form>
          </div>
      </div>
        <div className='bg-text flex flex-col w-full lg:w-1/3 px-4 py-8 mx-auto lg:py-16 lg:px-12 rounded-lg border-2'>
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
              className="text-text bg-primary hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
