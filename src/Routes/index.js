import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import PrivateRoute from './PrivateRoute'

import Login from "../pages/Login";
import ClientForm from "../pages/ClientForm";
import ListClientes from "../pages/Clientes/ListClientes";
import Template from "../template";
import ListServices from "../pages/ListServices";
import ServiceForm from "../pages/ServiceForm";
import ListInvoices from "../pages/ListInvoices";
import InvoiceForm from "../pages/InvoiceForm";
import NoteInfo from "../pages/NoteInfo";
import CompanyForm from "../pages/CompanyForm";
import SendCertificate from "../pages/SendCertificate";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<PrivateRoute><Template component={<ClientForm />} /></PrivateRoute>} path="/cliente/cadastro" />
        <Route element={<PrivateRoute><Template component={<ClientForm />} /></PrivateRoute>} path="/cliente/:id" />
        <Route element={<PrivateRoute><Template component={<ServiceForm />} /></PrivateRoute>} path="/servico/cadastro" />
        <Route element={<PrivateRoute><Template component={<ServiceForm />} /></PrivateRoute>} path="/servico/:id" />
        <Route element={<PrivateRoute><Template component={<InvoiceForm />} /></PrivateRoute>} path="/nota/cadastro" />
        <Route element={<PrivateRoute><Template component={<ListClientes />} /></PrivateRoute>} path="/cliente" />
        <Route element={<PrivateRoute><Template component={<ListServices />} /></PrivateRoute>} path="/servico" />
        <Route element={<PrivateRoute><Template component={<ListInvoices />} /></PrivateRoute>} path="/nota" />
        <Route element={<PrivateRoute><Template component={<NoteInfo />} /></PrivateRoute>} path="/nota/:id" />
        <Route element={<PrivateRoute><Template component={<SendCertificate />} /></PrivateRoute>} path="/vincular-certificado" />
        <Route element={<Template dontShowHeader={true} component={<CompanyForm />} />} path="/empresa/cadastro" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
