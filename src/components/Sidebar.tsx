import { sidebarNavaigation } from "../constants";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="navigation">
        <div className="user"></div>

        <div className="navigation-wrapper">
          {sidebarNavaigation.map((item) => (
            <img
              key={item.alt}
              className={`${item.alt === "Home" && "home-img"}`}
              src={item.src}
              alt={item.alt}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>

      <div className="setting">
        <img src="/assets/icons/gear.svg" alt="gear" width={24} height={24} />

        <div>SP</div>
      </div>
    </section>
  );
};

export default Sidebar;
