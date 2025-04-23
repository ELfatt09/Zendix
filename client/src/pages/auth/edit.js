import { useEffect, useState } from 'react';
import { useAuth } from '../../authContext';
import axios from 'axios';

function Edit() {
  const { user, edit } = useAuth();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJobsId, setSelectedJobsId] = useState(user);

  const handleEdit = (e) => {
    e.preventDefault();
    edit(username, bio, user.pfpPath);
    window.location.reload();
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
    setUsername(user?.username ?? '');
    setBio(user?.bio ?? '');
  }, [user]);


  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update {user?.username} profile
        </h2>
        <form onSubmit={handleEdit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bio
              </label>
              <textarea
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter your bio..."
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <ul>
                {jobs.map((job) => (
                  <li key={job.id}>
                    <div className="flex items-center mb-4">
   <input
    id={`radio-${job.id}`}
    type="radio"
    value={job.id}
    name="job-radio"
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    checked={selectedJobsId === job.id}
    onChange={(e) => setSelectedJobsId(+e.target.value)}
  />
  <label
    htmlFor={`radio-${job.id}`}
    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    {job.Name}
  </label>
</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Edit;

