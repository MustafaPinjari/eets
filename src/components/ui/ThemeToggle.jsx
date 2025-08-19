import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      iconName={theme === 'light' ? 'Moon' : 'Sun'}
      iconSize={20}
    >
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;