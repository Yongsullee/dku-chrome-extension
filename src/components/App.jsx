import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Todo from './Todo.jsx';
import COLOR from '../common/constants/index';
import themes from '../provider/theme';

const getDefaultColorMode = () => {
  const defaultColorMode = window.localStorage.getItem(COLOR.LOCAL_STORAGE_KEY);

  if (typeof defaultColorMode === 'string') {
    return defaultColorMode;
  }

  const defaultMediaQuery = window.matchMedia(COLOR.MEDIA_KEY);

  if (typeof defaultMediaQuery.matches === 'boolean')
    return defaultMediaQuery.matches ? COLOR.DARK_MODE : COLOR.LIGHT_MODE;

  return COLOR.LIGHT_MODE;
};

const App = () => {
  const [theme, setTheme] = useState(COLOR.LIGHT_MODE);

  const toggleTheme = () =>
    setTheme(color =>
      color === COLOR.LIGHT_MODE ? COLOR.DARK_MODE : COLOR.LIGHT_MODE,
    );

  useEffect(() => {
    setTheme(getDefaultColorMode());
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <AppWrapper>
        <Todo toggleTheme={toggleTheme} />
      </AppWrapper>
    </ThemeProvider>
  );
};

const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  transition: all 0.4s line ar;
  font-family: “Helvetica Neue”, Helvetica, Arial, sans-serif;
  color: ${({ theme }) => theme.textColor};
  height: 100%;
  z-index: 21474836456;
  border-radius: 16px;
  margin: 0;
  padding-right: 40px;
  top: 0;
  right: 0;
  position: fixed;
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
  overflow: auto scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;

    border-radius: 6px;
    background: ${({ theme }) => theme.backgroundColor};
  }
  &::-webkit-scrollbar-thumb {
    color: ${({ theme }) => theme.color};
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

export default App;
