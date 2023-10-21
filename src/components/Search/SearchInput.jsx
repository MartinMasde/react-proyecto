
import { Input, Space } from 'antd';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const App = () => (
  <Space direction="vertical">

    <Search
      placeholder="input repository"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  </Space>
);
export default App;