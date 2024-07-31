import { Card, Input } from "antd";
import { TiUserOutline } from "react-icons/ti";


export default function Signup() {
  return (
    <div className="form-container">
      <Card>
        <h1>Signup</h1>
        <form action="">
          <Input placeholder="username" prefix={<TiUserOutline />} />
          <Input placeholder="username" prefix={<TiUserOutline />} />
          <Input.Password placeholder="password" />
          <Input.Password placeholder="confirm password" />
        </form>
      </Card>
    </div>
  );
}
