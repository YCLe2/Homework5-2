import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import List from "./page/List.js";
import Create from "./page/Create.js";
import Detail from "./page/Detail.js";
import Update from "./page/Update.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='' element={<List />} />
        <Route path='/list' element={<List />} />
        <Route path='/create' element={<Create />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/update' element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}