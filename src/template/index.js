import { Header } from "./index.style";

const Template = ({ component }) => {
  return (<>
    <Header>
      <h1>Eminota</h1>
    </Header>
    {component}
  </>);
};

export default Template;
