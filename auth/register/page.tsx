'use client';

import { useForm } from 'react-hook-form';

type RegisterFormData = {
  username: string;
  password: string;
  confirm: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // Only runs when every input passes validation
  const onSubmit = (data: RegisterFormData) => {
    console.log('Success', data.username);
  };

  return (
    <main style={{ maxWidth: 400, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            type="text"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
          />
          {errors.username && (
            <p role="alert" style={{ color: 'red', margin: '0.25rem 0 0' }}>
              {errors.username.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p role="alert" style={{ color: 'red', margin: '0.25rem 0 0' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirm">Confirm password</label>
          <br />
          <input
            id="confirm"
            type="password"
            {...register('confirm', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match',
            })}
          />
          {errors.confirm && (
            <p role="alert" style={{ color: 'red', margin: '0.25rem 0 0' }}>
              {errors.confirm.message}
            </p>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </main>
  );
}