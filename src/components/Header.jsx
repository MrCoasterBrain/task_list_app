import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <h1>Менеджер задач</h1>
      <nav className="app-nav">
        <Link to="/">Задачи</Link>
        <Link to="/about">О приложении</Link>
      </nav>
    </header>
  );
}

export default Header;
