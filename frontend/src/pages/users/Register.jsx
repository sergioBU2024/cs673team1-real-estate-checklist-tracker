import { useState } from 'react';
import Alert from '../../Components/Alert';

const Register = () => {
    //Error State
    const [error, setError] = useState(null);

    //Form data state
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      passwordConfirm: ''
    });

    //Handle Login
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(formData);
    }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Logo section */}
      <div className="w-full md:w-2/3 bg-green-500 flex flex-col items-center justify-center p-8">
        <div className="text-9xl md:text-[200px] text-black">
          <i className="fa-solid fa-house-medical-circle-check"></i>
        </div>
        <h2 className="text-xl md:text-2xl text-center font-semibold text-black mt-4">
          Unlock simplicity in your rental journey!
        </h2>
      </div>
      
      {/* Login form section */}
      <div className="w-full md:w-1/3 bg-white p-8 flex flex-col justify-center">
        <section className="card max-w-md mx-auto w-full">
          <h1 className="title">Create a new account</h1>

          <form className="space-y-4" onSubmit={handleRegister}>
            <input 
              type="email" 
              placeholder="Email Address"  
              className="input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              autoFocus 
            />
            <input 
              type="password" 
              placeholder="Password"  
              className="input" 
              value={formData.password}
              onChange={(e) => setFormData( { ...formData, password: e.target.value })}
            />
            <input 
              type="password" 
              placeholder="Confirm Password"  
              className="input" 
              value={formData.passwordConfirm}
              onChange={(e) => setFormData( { ...formData, passwordConfirm: e.target.value })}
            />
            <button className="btn">
              Register
            </button>
          </form>

          { error && <Alert msg={error} /> }
        </section>
      </div>
    </div>
  );
}

export default Register;