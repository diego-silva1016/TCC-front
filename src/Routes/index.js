import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import ClientForm from "../pages/ClientForm";
import ListClientes from "../pages/Clientes/ListClientes";
import Template from "../template";
import ListServices from "../pages/ListServices";
import ServiceForm from "../pages/ServiceForm";
import ListInvoices from "../pages/ListInvoices";
import InvoiceForm from "../pages/InvoiceForm";
import NoteInfo from "../pages/NoteInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Template component={<ClientForm />} />} path="/cliente/cadastro" />
        <Route element={<Template component={<ClientForm />} />} path="/cliente/:id" />
        <Route element={<Template component={<ServiceForm />} />} path="/servico/cadastro" />
        <Route element={<Template component={<ServiceForm />} />} path="/servico/:id" />
        <Route element={<Template component={<InvoiceForm />} />} path="/nota/cadastro" />
        <Route element={<Template component={<ListClientes />} />} path="/cliente" />
        <Route element={<Template component={<ListServices />} />} path="/servico" />
        <Route element={<Template component={<ListInvoices />} />} path="/nota" />
        <Route element={<Template component={<NoteInfo />} />} path="/nota/:codigo" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
