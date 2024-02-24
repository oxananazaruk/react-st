import { Toaster } from 'react-hot-toast';
import { NavLink, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/create">Create quiz</NavLink>
            </li>
            <li>
              <NavLink to="/list">Quizzes</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};
