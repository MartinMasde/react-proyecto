// import { Header } from 'antd/es/layout/layout';
import "./App.css";
import Search from "./components/Search/Search";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeCard from "./pages/HomePage";
import HistoryList from "./pages/HistoryListPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<HomeCard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/history" element={<HistoryList />} />
        <Route path="/*" element={<Navigate replace to="/login" />} />

      </Routes> 

    </>
  );
}

export default App;

