const filteredMenu = [];

export default separateCategories = (MenuItems) => {
  const mentioned = {};

  MenuItems.forEach((item) => {
    const registeredCategories = Object.keys(mentioned);
    if (registeredCategories.includes(item.category)) {
      filteredMenu[mentioned[item.category]].push(item);
    } else {
      mentioned[item.category] = filteredMenu.length;
      filteredMenu.push([item]);
    }
  });
  filteredMenu.map((item) => {
    item.map((food) => {
      console.log("Food dds: ", food.title);
    });
  });
  return filteredMenu;
};
