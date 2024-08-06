'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/loader/loader';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset the error message

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Save token to localStorage or cookies
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Set the error message from the server response
        setError(error.response.data.message || 'Login failed. Please check your email and password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md w-[700px]">
        <h2 className="text-4xl font-bold mb-12 text-blue border-b-4 border-blue pb-3">Dreamist Login</h2>
        <div className='flex flex-col min-[590px]:flex-row gap-5'>
          <figure className='hidden min-[590px]:block'>
            <Image src="https://instagram.fpew1-1.fna.fbcdn.net/v/t51.2885-19/87326094_1261732130697060_3845002487434051584_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fpew1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=zqjAL8uT-KoQ7kNvgFRpxGS&gid=deaf320b98a24cd7a4729c6b3ad7533e&edm=AFg4Q8wBAAAA&ccb=7-5&oh=00_AYBEO5vzVHTd-yBGD50QV-Zzryfkx1SYmsuFPyFKuoYrNg&oe=66B50CA1&_nc_sid=0b30b7" alt='Dreamist Logo' width="200" height="200" />
          </figure>
          <form className='min-[590px]:w-[60%]' onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            {error && (
              <div className="mb-4 text-red-600 text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="relative w-full bg-blue text-white py-2 rounded hover:bg-blue/90"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
