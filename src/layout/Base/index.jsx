import NavAdmin from "../../components/Nav/NavAdmin/Nav";
import NavStaff from "../../components/Nav/NavStaff/Nav";
import NavUser from "../../components/Nav/NavUser/Nav";

const BaseLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.role;
  console.log(role);
  if (role === 1)
    return (
      <>
        <NavAdmin />
        {children}
        {/* <custom footer /> */}
      </>
    );
  else if (role === 2)
    return (
      <>
        <NavStaff />
        {children}
        {/* <custom footer /> */}
      </>
    );
  else if (role === 3)
    return (
      <>
        <NavUser />
        {children}
        {/* <custom footer /> */}
      </>
    );
};

export default BaseLayout;
