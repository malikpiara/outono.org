import { login } from './actions'

export default function LoginPage() {
  return (
    <form className='m-auto flex flex-col max-w-96'>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login} className='bg-black text-white rounded-md p-2'>Log in</button>
    </form>
  )
}