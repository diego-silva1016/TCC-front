import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import ClientForm from "../pages/ClientForm";
import ListClientes from "../pages/Clientes/ListClientes";
import Template from "../template";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Template component={<ClientForm />} />} path="/cliente/cadastro" />
        <Route element={<Template component={<ClientForm />} />} path="/cliente/:id" />
        <Route element={<Template component={<ListClientes />} />} path="/cliente" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
