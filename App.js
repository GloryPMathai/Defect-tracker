
import React, { useState, useEffect,Suspense } from 'react';
import './App.css';
import Filter from './components/Filter';
import Defecttracker from './components/Header';
import Defects from './components/Defects';
import axios from 'axios';


// const Defects =(() => import("./components/Defects"));

function App() {
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [defects, setDefects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/defectDetails")
      .then((result) => {
        setDefects(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredDefects = defects.filter((defect) => {
    const isPriorityMatch = priority === "All" || defect.Priority === priority;
    const isCategoryMatch = category === "All" || defect.Defect_Category === category;
    return isPriorityMatch && isCategoryMatch;
  });

  const searchResults = filteredDefects.length;

  return (
    <div className="App">
      <Defecttracker>
        <Filter priority={priority} setpriority={setPriority} category={category} setcategory={setCategory} />
        <h4 id="searchColor">Search Results :{searchResults}</h4>
        {/* <Defectdetails /> */}
        <Suspense fallback={<div>Loading</div>}>
          <Defects setDefects={setDefects} filteredDefects={filteredDefects} />
        </Suspense>
      </Defecttracker>
    </div>
  );
}

export default App;


