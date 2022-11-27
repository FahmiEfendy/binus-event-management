const styles = {
  container: {
    backgroundColor: "gray",
    height: "8vh",
  },
  logo: {
    height: "60px",
    width: "80px",
  },
  profilePicture: {
    height: "50px",
    width: "50px",
  },
};

const Header = () => {
  const username = "John Doe";

  return (
    <div style={styles.container} className="d-flex align-items-center">
      <img
        style={styles.logo}
        className="ms-5 py-2"
        src={require("../assets/logo-binus.png")}
        alt="Logo Binus"
      />
      <div className="input-group w-25 mx-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search something..."
        />
        <span className="input-group-text">Search</span>
      </div>
      <p className="h5 my-auto mx-4">Home</p>
      <p className="h5 my-auto mx-4">Organization List</p>
      <p className="h5 my-auto mx-4">Event History</p>
      <div className="ms-auto d-flex">
        <p className="h5 my-auto mx-4">{username}</p>
        <img
          style={styles.profilePicture}
          src={require("../assets/user-profile-picture.jpg")}
          alt="User Profile"
          className="rounded-circle me-5"
        />
      </div>
    </div>
  );
};

export default Header;
